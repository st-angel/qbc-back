import { SetMetadata } from '@nestjs/common';

/*This is a custom decorator to specify the privileges required for accessign the endpoint.*/
export const PRIVILEGES_KEY = 'privs';
export const Privileges = (...privs: string[]) =>
  SetMetadata(PRIVILEGES_KEY, privs);
