import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // permite que React (otro puerto) haga requests
  await app.listen(3000);
}
bootstrap();