/*
Use bcrypt to compare the hash and provided password
*/
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from '../users/user.model';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<User> {
    const user = await this.usersService.findOne(username);
    const match = await this.passwordsMatch(pass, user?.passwordHash);
    if (user && match) {
      user.passwordHash = undefined;
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = {
      username: user.username,
      sub: user.userId,
      privs: user.privileges,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  private async passwordsMatch(pass: string, hash: string) {
    if (hash) {
      const match = await bcrypt.compare(pass, hash);
      return match;
    }
    return null;
  }
}
