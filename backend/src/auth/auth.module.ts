// src/auth/auth.module.ts
import { Module } from '@nestjs/common'; 
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { UserModule } from '../user/user.module'; // 👈 Importa el módulo de usuarios

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: 'secretKey123',   // ⚠️ En producción usa variable de entorno
      signOptions: { expiresIn: '1h' },
    }),
    UserModule, // 👈 Aquí se agrega el UserModule
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
