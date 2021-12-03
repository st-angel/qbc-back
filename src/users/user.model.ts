/*
This file contains the definitions for the user interface and mongoDB user schema
*/
import * as moongose from 'mongoose';

export interface User {
  userId: number;
  username: string;
  passwordHash: string;
  privileges: string[];
}

export const userSchema = new moongose.Schema(
  {
    userId: { type: Number, required: false },
    username: { type: String, required: true },
    passwordHash: { type: String, required: true },
    privileges: { type: [String], required: false },
  },
  { collection: 'users' },
);
