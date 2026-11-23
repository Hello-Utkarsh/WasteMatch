import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export enum DeviceType {
  MOBILE = 'mobile',
  TABLET = 'tablet',
  LAPTOP = 'laptop',
}

export class SendOtpDto {
  @IsEmail({}, { message: 'Please provide a valid business email' })
  @IsNotEmpty()
  email: string;
}

export class VerifyOtpDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 6, { message: 'OTP must be exactly 6 digits' })
  @Matches(/^\d+$/, { message: 'OTP must contain only numbers' })
  otp: string;
}

export class CompleteRegistrationDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @MaxLength(12, { message: 'Password cannot exceed 12 characters' })
  password: string;

  @IsEnum(DeviceType, {
    message: 'Device must be either mobile, tablet, or laptop',
  })
  device: DeviceType;
}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @MaxLength(12, { message: 'Password cannot exceed 12 characters' })
  password: string;

  @IsEnum(DeviceType, { message: 'Device must be either mobile, tablet, or laptop' })
  device: DeviceType;
}
