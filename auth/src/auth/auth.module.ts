import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { RedisModule } from '../common/redis/redis.module.js';
import { JwtModule } from '@nestjs/jwt';


@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [RedisModule, AuthModule, JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET || 'super-secret-access-key',
      signOptions: { expiresIn: '30min' },
    })],
})
export class AuthModule {}
