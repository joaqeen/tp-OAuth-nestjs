import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service.js';
import { User } from '../users/entities/user.entity.js';
import { AuthResult, GoogleUser } from './interfaces/google-user.interface.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateGoogleUser(googleUser: GoogleUser): Promise<AuthResult> {
    const { googleId, email, firstName, lastName, picture } = googleUser;

    if (!email) {
      throw new UnauthorizedException('Google no devolvió un email');
    }

    let user: User | null = await this.usersService.findByGoogleId(googleId);

    if (user) {
      // Ya se logueó antes con Google: refrescamos los datos del perfil
      user = await this.usersService.update(user.id, {
        firstName,
        lastName,
        picture,
      });
    } else {
      const existingByEmail = await this.usersService.findByEmail(email);

      if (existingByEmail) {
        // Se registró de forma tradicional: vinculamos su cuenta de Google
        user = await this.usersService.update(existingByEmail.id, {
          googleId,
          picture,
        });
      } else {
        // Usuario nuevo
        user = await this.usersService.create({
          googleId,
          email,
          firstName,
          lastName,
          picture,
        });
      }
    }

    return { user, jwt: this.generateJwt(user) };
  }

  private generateJwt(user: User): string {
    const payload = { sub: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }
}