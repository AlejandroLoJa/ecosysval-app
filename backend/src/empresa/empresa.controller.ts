import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { EmpresaReportService } from './empresa.report.service';

@Controller('empresas')
export class EmpresaController {
  constructor(
    private readonly empresaService: EmpresaService,
    private readonly empresaReportService: EmpresaReportService, // ✅ inyectamos el generador de PDF
  ) {}

  @Post()
  crear(@Body() body: any) {
    return this.empresaService.crear(body);
  }

  @Get()
  obtenerTodas() {
    return this.empresaService.obtenerTodas();
  }

  @Get(':id')
  obtenerPorId(@Param('id', ParseIntPipe) id: number) {
    return this.empresaService.obtenerPorId(id);
  }

  @Put(':id')
  actualizar(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return this.empresaService.actualizar(id, body);
  }

  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.empresaService.eliminar(id);
  }

  // ✅ NUEVO: Generar y devolver URL del PDF del perfil empresarial
  @Get(':id/reporte')
  async generarReporte(@Param('id', ParseIntPipe) id: number) {
    const empresa = await this.empresaService.obtenerPorId(id);
    if (!empresa) {
      throw new NotFoundException('Empresa no encontrada');
    }

    const url = await this.empresaReportService.generarPDF(empresa);
    return {
      success: true,
      url, // p.ej. "/uploads/empresa_3.pdf"
    };
  }
}
