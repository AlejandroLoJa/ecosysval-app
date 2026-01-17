import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { CapacitacionDto } from '../contact/dto/capacitacion.dto';

@Injectable()
export class MailerService {
  private readonly logger = new Logger(MailerService.name);
  
  // El transporter se inicializa con variables de entorno de MAIL_USER y MAIL_PASS
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER, 
      pass: process.env.MAIL_PASS, 
    },
  });

  async enviarCorreoCapacitacion(data: CapacitacionDto) {
    // Construcción del HTML para el cuerpo del correo
    const html = `
      <h2>Nueva solicitud de capacitación</h2>
      <p><strong>Nombre:</strong> ${data.nombre} ${data.apellido}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Teléfono:</strong> ${data.telefono}</p>
      <p><strong>Estado:</strong> ${data.estado}</p>
      <p><strong>Empresa:</strong> ${data.empresa}</p>
      <p><strong>Cargo:</strong> ${data.cargo}</p>
      <p><strong>Interés:</strong> ${data.interes}</p>
      <p><strong>Mensaje:</strong> ${data.mensaje || 'Sin mensaje adicional'}</p>
    `;

    try {
      // Intenta enviar el correo
      await this.transporter.sendMail({
        from: `Contacto Ecosysval <${process.env.MAIL_USER}>`,
        to: process.env.MAIL_DESTINO,
        subject: 'Nueva solicitud de capacitación',
        html,
      });
      this.logger.log(`Correo de capacitación enviado exitosamente a ${process.env.MAIL_DESTINO}`);

    } catch (error) {
      // Captura y registra el error detallado en la consola de NestJS
      this.logger.error('ERROR al enviar correo con Nodemailer:', error.message, error.stack);
      // Re-lanza el error para que el ContactService lo capture y el frontend reciba un 500
      throw new Error('Fallo la autenticación o el envío de correo. Revisa el log del servidor.');
    }
  }
}