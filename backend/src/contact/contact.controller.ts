import { Body, Controller, Post } from '@nestjs/common';
import { CapacitacionDto } from './dto/capacitacion.dto';
import { ContactService } from './contact.service';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post('capacitaciones')
  crear(@Body() body: CapacitacionDto) {
    return this.contactService.crearSolicitud(body);
  }
}
