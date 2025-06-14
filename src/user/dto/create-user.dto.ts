import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  role: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;

  @IsOptional()
  username?: string;

  @IsOptional()
  address?: string;

  @IsOptional()
  contactNumber?: string;

  @IsOptional()
  businessName?: string;

  @IsOptional()
  businessType?: string;

  @IsOptional()
  profilePicture?: string;
}
