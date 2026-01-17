import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Capacitacion } from './entities/capacitacion.entity';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { MailerModule } from '../mailer/mailer.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Capacitacion]),
    MailerModule,
  ],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
