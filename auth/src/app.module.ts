import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { RedisModule } from './common/redis/redis.module.js';
import { DatabaseModule } from './common/database/database.module.js';
import { MailService } from './common/mail/mail.service.js';
import { MailModule } from './common/mail/mail.module.js';

@Module({
  imports: [AuthModule, RedisModule, DatabaseModule, MailModule],
  controllers: [AppController],
  providers: [AppService, MailService],
})
export class AppModule {}
