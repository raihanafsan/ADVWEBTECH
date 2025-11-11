/*import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateAdminDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  role?: string;
}*/
import { IsNotEmpty, Matches, MinLength, IsOptional, IsString } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
const dto = plainToInstance(CreateAdminDto, body);
const errors = validateSync(dto);
if (errors.length > 0) {
  throw new BadRequestException(errors);
}

export class CreateAdminDto {
  @IsNotEmpty()
  @Matches(/^[A-Za-z0-9 ]+$/, {
    message: 'Name must not contain special characters',
  })
  name: string;

  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @Matches(/(?=.*[a-z])/, {
    message: 'Password must contain at least one lowercase letter',
  })
  password: string;

  @IsNotEmpty()
  @Matches(/\.pdf$/, { message: 'File must be in PDF format' })
  fileName: string;

  @IsNotEmpty()
  @Matches(/^01\d{9}$/, {
    message: 'Phone number must start with 01 and be 11 digits',
  })
  phone: string;
  @IsOptional()
  @IsString()
  role?: string;
}
