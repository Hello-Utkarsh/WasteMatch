import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private transporter: nodemailer.Transporter;

  constructor() {
    this.logger.debug(`MAIL_USER loaded: ${Boolean(process.env.MAIL_USER)}, MAIL_PASSWORD loaded: ${Boolean(process.env.MAIL_PASSWORD)}`);
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST || 'smtp.gmail.com',
      port: Number(process.env.MAIL_PORT) || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  async sendOtpEmail(toEmail: string, otp: string) {
    try {
      const mailOptions = {
        from: `"WasteMatch" <${process.env.MAIL_USER}>`,
        to: toEmail,
        subject: 'Your Verification Code - WasteMatch',
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2>Welcome to WasteMatch!</h2>
            <p>Your One-Time Password (OTP) for registration is:</p>
            <h1 style="color: #2563eb; letter-spacing: 4px;">${otp}</h1>
            <p>This code expires in 5 minutes. Do not share it with anyone.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #666;">If you didn't request this, please ignore this email.</p>
          </div>
        `,
      };

      const info = await this.transporter.sendMail(mailOptions);
      this.logger.log(`OTP email sent to ${toEmail}: ${info.messageId}`);
    } catch (err) {
      this.logger.error(`Failed to send OTP email to ${toEmail}`, err);
      throw new Error('Could not send verification email');
    }
  }
}