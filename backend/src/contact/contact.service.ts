import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Capacitacion } from './entities/capacitacion.entity';
import { CapacitacionDto } from './dto/capacitacion.dto';
import { MailerService } from '../mailer/mailer.service';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Capacitacion)
    private readonly capacitacionRepo: Repository<Capacitacion>,
    private readonly mailerService: MailerService,
  ) {}

  async crearSolicitud(dto: CapacitacionDto) {
    const registro = this.capacitacionRepo.create(dto);
    await this.capacitacionRepo.save(registro);

    // Enviar correo
    await this.mailerService.enviarCorreoCapacitacion(dto);

    return {
      message: 'Solicitud creada y correo enviado correctamente.',
      data: registro,
    };
  }
}
