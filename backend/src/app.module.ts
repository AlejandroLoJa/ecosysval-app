import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';   // 👈 Importamos el AuthModule

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        if (process.env.NODE_ENV === 'test') {
          return {
            type: 'sqlite',
            database: ':memory:',
            dropSchema: true,
            autoLoadEntities: true,
            synchronize: true,
          };
        }

        return {
          type: 'postgres',
          host: config.get<string>('DB_HOST'),
          port: parseInt(config.get<string>('DB_PORT') ?? '5432', 10),
          username: config.get<string>('DB_USERNAME'),
          password: String(config.get<string>('DB_PASSWORD')),
          database: config.get<string>('DB_NAME'),
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
    UserModule,
    AuthModule,  // 👈 Aquí agregamos el módulo de autenticación
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
