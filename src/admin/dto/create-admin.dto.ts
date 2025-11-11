import { IsNotEmpty, Matches, MinLength, IsOptional, IsString } from 'class-validator';

export class CreateAdminDto {
  @IsNotEmpty()
  @Matches(/^[A-Za-z0-9 ]+$/, { message: 'Name must not contain special characters' })
  name: string;

  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @Matches(/(?=.*[a-z])/, { message: 'Password must contain at least one lowercase letter' })
  password: string;

  @IsNotEmpty()
  @Matches(/\.pdf$/, { message: 'File must be in PDF format' })
  fileName: string;

  @IsNotEmpty()
  @Matches(/^01\d{9}$/, { message: 'Phone number must start with 01 and be 11 digits' })
  phone: string;

  @IsOptional()
  @IsString()
  role?: string;
}
