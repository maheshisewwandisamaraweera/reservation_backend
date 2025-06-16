import { IsEmail, IsEnum, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export enum UserRole {
  CLIENT = 'client',
  SERVICE_PROVIDER_ADMIN = 'serviceProviderAdmin',
  SERVICE_PROVIDER_STAFF = 'serviceProviderStaff',
  SUPER_ADMIN = 'superAdmin',
}

export class CreateUserDto {
  @IsEnum(UserRole, {
    message: 'Role must be one of: client, serviceProviderAdmin, serviceProviderStaff, superAdmin',
  })
  role: UserRole;

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

  @IsOptional()
  status?: string;
}
