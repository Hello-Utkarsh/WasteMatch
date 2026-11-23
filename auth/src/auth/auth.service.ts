import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RedisService } from '../common/redis/redis.service.js';
import { DatabaseService } from '../common/database/database.service.js';
import * as crypto from 'crypto';
import * as argon2 from 'argon2';
import { MailService } from '../common/mail/mail.service.js';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly redis: RedisService,
    private readonly db: DatabaseService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
  ) {}

  private hashOtp(otp: string): string {
    return crypto
      .createHmac('sha256', process.env.OTP_SECRET || 'wastematch-dev-secret')
      .update(otp)
      .digest('hex');
  }

  private async generateAndSaveTokens(
    userId: number,
    email: string,
    role: string,
    device: string,
  ) {
    const payload = { sub: userId, email, role };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET || 'super-secret-access-key',
      expiresIn: '30m',
    });

    const refreshToken = crypto.randomBytes(32).toString('hex');
    const refreshTokenHash = crypto
      .createHash('sha256')
      .update(refreshToken)
      .digest('hex');

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await this.db.query(
      `INSERT INTO sessions (user_id, token_hash, expires_at, device) VALUES ($1, $2, $3, $4)`,
      [userId, refreshTokenHash, expiresAt, device],
    );

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async sendRegistrationOtp(email: string) {
    const normalizedEmail = email.trim();

    const existingUser = await this.db.query(
      'SELECT id FROM users WHERE email = $1',
      [normalizedEmail],
    );

    if (existingUser.rows.length > 0) {
      throw new ConflictException('An account with this email already exists');
    }
    const redisKey = `otp:register:${normalizedEmail}`;

    const otp = crypto.randomInt(100000, 1000000).toString();

    const otpHash = this.hashOtp(otp);

    await this.mailService.sendOtpEmail(normalizedEmail, otp);

    await this.redis.client.set(
      redisKey,
      JSON.stringify({ hash: otpHash, attempts: 0 }),
      'EX',
      300,
    );

    return { message: 'OTP sent to email' };
  }

  async verifyRegistration(email: string, otp: string) {
    const normalizedEmail = email.trim();
    const redisKey = `otp:register:${normalizedEmail}`;

    const raw = await this.redis.client.get(redisKey);
    if (!raw) {
      throw new BadRequestException('OTP expired or not requested');
    }

    const data = JSON.parse(raw) as { hash: string; attempts: number };
    if (data.attempts >= 5) {
      await this.redis.client.del(redisKey);
      throw new BadRequestException(
        'Too many invalid attempts. Request a new OTP.',
      );
    }

    const incomingHash = this.hashOtp(otp);

    if (incomingHash !== data.hash) {
      data.attempts += 1;
      const ttl = await this.redis.client.ttl(redisKey);
      await this.redis.client.set(
        redisKey,
        JSON.stringify(data),
        'EX',
        ttl > 0 ? ttl : 300,
      );
      throw new BadRequestException('Invalid OTP');
    }

    await this.redis.client.del(redisKey);

    const registrationToken = crypto.randomBytes(32).toString('hex');
    const tokenKey = `token:register:${normalizedEmail}`;

    await this.redis.client.set(tokenKey, registrationToken, 'EX', 600);

    return {
      message: 'OTP verified successfully',
      registration_token: registrationToken,
    };
  }

  async completeRegistration(email: string, password: string, device: string) {
    const normalizedEmail = email.trim();
    const tokenKey = `token:register:${normalizedEmail}`;

    const verificationToken = await this.redis.client.get(tokenKey);
    if (!verificationToken) {
      throw new BadRequestException(
        'Email not verified or session expired. Please verify OTP first.',
      );
    }

    const existingUser = await this.db.query(
      'SELECT id FROM users WHERE email = $1',
      [normalizedEmail],
    );
    if (existingUser.rows.length > 0) {
      throw new BadRequestException('User with this email already exists');
    }

    const passwordHash = await argon2.hash(password);
    console.log(password);

    const insertQuery = `
      INSERT INTO users (email, password_hash, role, is_verified)
      VALUES ($1, $2, $3, $4)
      RETURNING id, email, role, created_at
    `;
    const result = await this.db.query(insertQuery, [
      normalizedEmail,
      passwordHash,
      'buyer',
      true,
    ]);

    await this.redis.client.del(tokenKey);

    const user = result.rows[0];
    console.log(user)
    const tokens = await this.generateAndSaveTokens(
      user.id,
      user.email,
      user.role,
      device,
    );

    return {
      message: 'Registration completed successfully',
      user: user,
      ...tokens,
    };
  }

  async login(email: string, password: string, device: string) {
    const normalizedEmail = email.trim();
    const query = `
    SELECT id, email, password_hash, is_verified FROM users WHERE email = $1`;
    const res = await this.db.query(query, [email]);
    if (!res.rows[0]) {
      throw new UnauthorizedException('Invalid password or email');
    }
    const user = res.rows[0];
    const isPasswordValid = await argon2.verify(user.password_hash, password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }
    if (!user.is_verified) {
      throw new UnauthorizedException(
        'Please verify your email before logging in',
      );
    }
    const tokens = await this.generateAndSaveTokens(
      user.id,
      user.email,
      user.role,
      device,
    );
    return {
      message: 'Logged in successfully',
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      ...tokens,
    };
  }

  async refresh(token: string) {
    const refreshTokenHash = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    const query = `SELECT id, user_id, token_hash, expires_at, device FROM sessions WHERE token_hash = $1`;
    const res = await this.db.query(query, [refreshTokenHash]);
    if (!res.rows[0]) {
      await this.db.query('DELETE FROM sessions WHERE token_hash = $1', [
        refreshTokenHash,
      ]);
      throw new UnauthorizedException('Refresh token has expired');
    }

    if (res.rows[0].expires_at <= Date.now()) {
      await this.db.query('DELETE FROM sessions WHERE token_hash = $1', [
        refreshTokenHash,
      ]);
      throw new UnauthorizedException('Refresh token has expired');
    }
    console.log(res.rows[0]);
    const getUserQuery = `SELECT id, email, role FROM users WHERE id = $1`;
    const userContent = await this.db.query(getUserQuery, [
      res.rows[0].user_id,
    ]);
    if (!userContent.rows[0]) {
      throw new UnauthorizedException('User no longer exists');
    }
    const user = userContent.rows[0];

    const newTokens = await this.generateAndSaveTokens(
      userContent.rows[0].id,
      userContent.rows[0].email,
      userContent.rows[0].role,
      res.rows[0].device,
    );
    const newExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await this.db.query(
      `UPDATE sessions SET token_hash = $1, expires_at = $2, created_at = CURRENT_TIMESTAMP WHERE id = $3`,
      [newTokens.refresh_token, newExpiresAt, res.rows[0].id],
    );
    return {
      message: 'Token refreshed successfully',
      ...newTokens,
    };
  }

  async logout(token: string) {
    const refreshTokenHash = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    const query = `DELETE FROM sessions WHERE token_hash = $1`;
    await this.db.query(`DELETE FROM sessions WHERE token_hash = $1`, [
      refreshTokenHash,
    ]);

    return { message: 'Logged out successfully' };
  }

  async logoutAll(token: string) {
    const refreshTokenHash = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');
    const getSessionDataQuery = `SELECT user_id FROM sessions WHERE token_hash = $1`;
    const sessionData = await this.db.query(getSessionDataQuery, [
      refreshTokenHash,
    ]);
    if (!sessionData) {
      throw new UnauthorizedException('Invalid or expired session');
    }
    const userId = sessionData.rows[0].user_id;

    await this.db.query(`DELETE FROM sessions WHERE user_id = $1`, [userId]);
    console.log("object")

    return { message: 'Logged out from all devices successfully' };
  }

  async getProfile(token: string) {
    const payload = this.jwtService.verify(token, {
      secret: process.env.JWT_ACCESS_SECRET || 'super-secret-access-key',
    });
    const result = await this.db.query(
      'SELECT id, email, role, created_at FROM users WHERE id = $1',
      [payload.sub],
    );

    if (result.rows.length === 0) {
      throw new NotFoundException('User not found');
    }

    return {
      user: result.rows[0],
    };
  }
}
