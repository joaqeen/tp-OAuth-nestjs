import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';
import { AuthResult } from './interfaces/google-user.interface.js';

@Controller('auth')
export class AuthController {
  // Inicia el flujo: el guard redirige a la pantalla de login de Google
  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth(): void {}

  // Google vuelve acá. El guard ejecuta validate() y deja el resultado en req.user
  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req: Request & { user: AuthResult }) {
    const { user, jwt } = req.user;
    return { token: jwt, user };
  }
}