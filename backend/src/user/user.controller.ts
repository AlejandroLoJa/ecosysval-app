import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 🔹 Crear usuario (registro)
  @Post()
  async create(@Body() user: Partial<User>) {
    if (!user.password) {
      return { success: false, message: 'La contraseña es obligatoria' };
    }

    // encriptar contraseña antes de guardar
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;

    const newUser = await this.userService.create(user);
    return { success: true, message: 'Usuario registrado', user: newUser };
  }

  // 🔹 Obtener todos los usuarios
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  // 🔹 Obtener un usuario por ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(Number(id));
  }

  // 🔹 Actualizar usuario
  @Put(':id')
  async update(@Param('id') id: string, @Body() user: Partial<User>) {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }
    return this.userService.update(Number(id), user);
  }

  // 🔹 Eliminar usuario
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.remove(Number(id));
  }

  // 🔹 Login
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.userService.findByEmail(body.email);

    if (!user) {
      return { success: false, message: 'Usuario no encontrado' };
    }

    const isPasswordValid = await bcrypt.compare(body.password, user.password);
    if (!isPasswordValid) {
      return { success: false, message: 'Contraseña incorrecta' };
    }

    return { success: true, message: 'Login exitoso', user };
  }
}
