import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);

    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    return this.authService.login(user);
  }

  @Post('profile')
  async profile(@Body() body: { token: string }) {
    // Aquí podrías decodificar el JWT si quieres validar más cosas
    return { message: 'Perfil cargado correctamente ✅' };
  }
}
