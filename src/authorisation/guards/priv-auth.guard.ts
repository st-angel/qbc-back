import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

/*
This custom guard will check if the current user has the required privileges to access the endpoint.
*/

@Injectable()
export class PrivAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPrivileges = this.reflector.get<string[]>(
      'privs',
      context.getHandler(),
    );

    if (!requiredPrivileges) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    return this.checkPrivileges(requiredPrivileges, user.privileges);
  }

  private checkPrivileges(requiredPriv: string[], priv: string[]): boolean {
    return requiredPriv?.some((p) => priv?.includes(p));
  }
}
