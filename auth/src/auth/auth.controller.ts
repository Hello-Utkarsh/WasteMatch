import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import {
  CompleteRegistrationDto,
  LoginDto,
  SendOtpDto,
  VerifyOtpDto,
} from './auth.dto.js';
import express from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register/send-otp')
  sendRegistrationOtp(@Body() dto: SendOtpDto) {
    return this.authService.sendRegistrationOtp(dto.email);
  }

  @Post('register/verify-otp')
  verifyOtp(@Body() dto: VerifyOtpDto) {
    return this.authService.verifyRegistration(dto.email, dto.otp);
  }

  @Post('register/complete')
  @HttpCode(HttpStatus.CREATED)
  async completeRegis(
    @Body() dto: CompleteRegistrationDto,
    @Res({ passthrough: true }) res: express.Response,
  ) {
    const result = await this.authService.completeRegistration(
      dto.email,
      dto.password,
      dto.device,
    );

    res.cookie('refresh_token', result.refresh_token, {
      httpOnly: true, // Invisible to JavaScript (protects against XSS)
      secure: process.env.NODE_ENV === 'production', // Send only over HTTPS in production
      sameSite: 'strict', // Protects against CSRF
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      path: '/auth', // Only sent to auth endpoints
    });
    const { refresh_token, ...clientResponse } = result;
    return clientResponse;
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: express.Response,
  ) {
    const result = await this.authService.login(
      dto.email,
      dto.password,
      dto.device,
    );

    res.cookie('refresh_token', result.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/auth',
    });

    const { refresh_token, ...clientResponse } = result;
    return clientResponse;
  }

  @Post('refresh')
  async refresh(@Req() req: express.Request, @Res() res: express.Response) {
    const dto = req.cookies;
    const refreshToken = req.cookies?.['refresh_token'];

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token cookie not found');
    }

    const result = await this.authService.refresh(refreshToken);
    res.cookie('refresh_token', result.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/auth',
    });

    const { refresh_token, ...clientResponse } = result;
    return clientResponse;
  }

  @Post('logout')
  async logout(@Req() req: express.Request, @Res({ passthrough: true }) res: express.Response) {
    const dto = req.cookies;
    const refreshToken = req.cookies?.['refresh_token'];
    console.log(refreshToken)

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token cookie not found');
    }
    console.log("object")
    const result = await this.authService.logout(refreshToken);
    res.clearCookie('refresh_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/auth',
    });
    console.log("object2")

    return { message: 'Logged out successfully' };
  }

  @Post('logout-all')
  @HttpCode(HttpStatus.OK)
  async logoutAll(@Req() req: express.Request, @Res({passthrough: true}) res: express.Response) {
    const dto = req.cookies;
    const refreshToken = req.cookies?.['refresh_token'];

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token cookie not found');
    }
    const result = await this.authService.logoutAll(refreshToken);

    res.clearCookie('refresh_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/auth',
    });

    return { message: 'Logged out from all devices successfully' };
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  async getProfile(@Req() req: express.Request) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Access token missing or malformed');
    }
    const token = authHeader.split(' ')[1];
    try {
      return await this.authService.getProfile(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired access token');
    }
  }
}
