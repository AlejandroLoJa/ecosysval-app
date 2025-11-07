import { Injectable } from '@nestjs/common';
import { Empresa } from './empresa.entity';
import * as fs from 'fs';
import * as path from 'path';

// ✅ Forma compatible con module: "nodenext"
import PDFDocument = require('pdfkit');

@Injectable()
export class EmpresaReportService {
  async generarPDF(empresa: Empresa): Promise<string> {
    const doc = new PDFDocument({ margin: 50 });
    const nombreArchivo = `empresa_${empresa.id}.pdf`;
    const ruta = path.join(__dirname, '../../uploads', nombreArchivo);

    // Crear carpeta si no existe
    if (!fs.existsSync(path.dirname(ruta))) {
      fs.mkdirSync(path.dirname(ruta), { recursive: true });
    }

    const stream = fs.createWriteStream(ruta);
    doc.pipe(stream);

    // === ENCABEZADO ===
    doc
      .fontSize(22)
      .fillColor('#1E3A8A')
      .text('Perfil Empresarial', { align: 'center' })
      .moveDown(1.5);

    // === LOGO DE LA EMPRESA ===
    try {
      if (empresa.logo && fs.existsSync(path.join(__dirname, '../../', empresa.logo))) {
        doc.image(path.join(__dirname, '../../', empresa.logo), 220, 100, { width: 150 });
        doc.moveDown(3);
      }
    } catch (error) {
      console.warn('⚠ No se pudo cargar el logo:', error);
    }

    // === INFORMACIÓN GENERAL ===
    doc
      .fontSize(14)
      .fillColor('black')
      .text(`Razón Social: ${empresa.razonSocial || '—'}`)
      .text(`Correo Electrónico: ${empresa.correo || '—'}`)
      .text(`Ubicación: ${empresa.ubicacion || '—'}`)
      .text(`Representante Legal: ${empresa.representante || '—'}`)
      .text(`Página Web: ${empresa.paginaWeb || '—'}`)
      .text(`Volumen de Ventas: ${empresa.volumenVentas || '—'}`)
      .text(`Empleados: ${empresa.empleados || '—'}`)
      .text(`Antigüedad: ${empresa.antiguedad || '—'}`)
      .moveDown();

    // === MISIÓN Y VISIÓN ===
    doc
      .fontSize(14)
      .fillColor('#1E3A8A')
      .text('Misión', { underline: true })
      .fontSize(12)
      .fillColor('black')
      .text(empresa.mision || '—', { align: 'justify' })
      .moveDown(1)
      .fontSize(14)
      .fillColor('#1E3A8A')
      .text('Visión', { underline: true })
      .fontSize(12)
      .fillColor('black')
      .text(empresa.vision || '—', { align: 'justify' })
      .moveDown(1.5);

    // === IMPORTACIONES / EXPORTACIONES ===
    doc
      .fontSize(14)
      .text('Importaciones:', { continued: true })
      .fillColor(empresa.importaciones ? 'green' : 'red')
      .text(empresa.importaciones ? ' ✔ Sí' : ' ✖ No')
      .fillColor('black')
      .text('Exportaciones:', { continued: true })
      .fillColor(empresa.exportaciones ? 'green' : 'red')
      .text(empresa.exportaciones ? ' ✔ Sí' : ' ✖ No')
      .fillColor('black')
      .moveDown();

    // === OTROS CAMPOS ===
    doc
      .fontSize(12)
      .text(`Productos: ${empresa.productos || '/'}`)
      .text(`Servicios: ${empresa.servicios || '/'}`)
      .text(`Socios Comerciales: ${empresa.socios || '/'}`)
      .text(`Objetivos de Desarrollo Sostenible: ${empresa.objetivos || '/'}`)
      .moveDown(2);

    // === PIE DE PÁGINA ===
    doc
      .fontSize(10)
      .fillColor('gray')
      .text('Generado automáticamente por el sistema OMEC', { align: 'center' });

    // Cierra el documento
    doc.end();

    // Esperar a que se cree el archivo antes de resolver
    return new Promise((resolve, reject) => {
      stream.on('finish', () => resolve(`/uploads/${nombreArchivo}`));
      stream.on('error', reject);
    });
  }
}
