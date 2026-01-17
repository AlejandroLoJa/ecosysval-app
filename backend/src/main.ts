import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Validaciones globales (DTOs)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,            // elimina campos no definidos en el DTO
      forbidNonWhitelisted: true, // lanza error si mandan campos extra
      transform: true,            // transforma tipos (ej: "1" -> 1)
    }),
  );

  // ✅ Habilitar CORS para tu frontend (React)
  app.enableCors({
    origin: ['http://localhost:3001', 'http://127.0.0.1:3001'],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  // ✅ Servir archivos estáticos (imágenes, videos, etc.)
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  // ✅ Puerto de ejecución del backend
  const PORT = 3000;
  await app.listen(PORT);

  console.log(`🚀 Backend corriendo en http://localhost:${PORT}`);
  console.log(`🖼️ Archivos disponibles en http://localhost:${PORT}/uploads`);
}

bootstrap();
