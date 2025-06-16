// roles.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../../user/dto/create-user.dto'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
  const request = context.switchToHttp().getRequest();
  const user = request.user;
  const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());

  if (!user || !requiredRoles) {
    return false;
  }
  const hasRole = requiredRoles.includes(user.role);
  return hasRole;
}
}