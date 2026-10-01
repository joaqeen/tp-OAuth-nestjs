import { User } from '../../users/entities/user.entity.js';

export interface GoogleUser {
  googleId: string;
  email?: string;
  firstName: string | null;
  lastName: string | null;
  picture: string | null;
}

export interface AuthResult {
  user: User;
  jwt: string;
}