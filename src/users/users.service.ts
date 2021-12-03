import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userMoDB: Model<User>) {}

  async findOne(username: string): Promise<User> | null {
    const users = await this.userMoDB.find();
    if (users) {
      return users.find((user: User) => user.username === username);
    }
    return null;
  }
}
