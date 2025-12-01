import { IsNotEmpty, Matches, MinLength, IsOptional, IsString } from 'class-validator';

export class CreateAdminDto {
  @IsNotEmpty()
  @Matches(/^[A-Za-z0-9 ]+$/, { message: 'Username must not contain special characters' })
  username: string;

  @IsNotEmpty()
  @IsString()
  fullname: string;



  

  @IsOptional()
  @IsString()
  role?: string;

 
}
