// roles.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../user/dto/create-user.dto';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);

