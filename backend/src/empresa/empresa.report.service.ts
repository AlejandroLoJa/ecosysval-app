import { Injectable } from '@nestjs/common';
import { Empresa } from './empresa.entity';
import * as fs from 'fs';
import * as path from 'path';
import PDFDocument = require('pdfkit');

@Injectable()
export class EmpresaReportService {
  async generarPDF(empresa: Empresa): Promise<string> {
    const doc = new PDFDocument({ size: 'A4', margin: 0 });
    const nombreArchivo = `empresa_${empresa.id}.pdf`;
    const ruta = path.join(__dirname, '..', '..', 'uploads', nombreArchivo);

    if (!fs.existsSync(path.dirname(ruta))) {
      fs.mkdirSync(path.dirname(ruta), { recursive: true });
    }

    const stream = fs.createWriteStream(ruta);
    doc.pipe(stream);

    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;

    // === Fondo ===
    const plantillaPath = path.join(
      __dirname,
      '..',
      '..',
      'src',
      'assets',
      'fichaempresarialvertical.png',
    );
    if (fs.existsSync(plantillaPath)) {
      doc.image(plantillaPath, 0, 0, { width: pageWidth, height: pageHeight });
    }

    // === Título (NO TOCAR) ===
    doc
      .font('Helvetica-Bold')
      .fontSize(22)
      .fillColor('#0F172A')
      .text(empresa.razonSocial || 'Nombre de la empresa', 60, 165, {
        width: pageWidth - 190,
        align: 'left',
      });

    // === Logo (NO TOCAR) ===
    try {
      if (
        empresa.logo &&
        fs.existsSync(path.join(__dirname, '..', '..', empresa.logo))
      ) {
        doc.image(
          path.join(__dirname, '..', '..', empresa.logo),
          pageWidth - 145,
          125,
          { width: 70 },
        );
      }
    } catch (error) {
      console.warn('⚠ No se pudo cargar el logo en el PDF:', error);
    }

    // === Fuente general ===
    doc.font('Helvetica').fontSize(10.5).fillColor('#111827');

    const colLeftX = 80;
    const colRightX = pageWidth / 2 + 120;

    // === Bloque superior (NO TOCAR) ===
    const offsetTop = 215;

    doc
      .font('Helvetica-Bold')
      .text('Razón social', colLeftX, offsetTop)
      .font('Helvetica')
      .text(empresa.razonSocial || '—', colLeftX, offsetTop + 15, {
        width: 250,
      });

    doc
      .font('Helvetica-Bold')
      .text('Correo electrónico', colRightX, offsetTop)
      .font('Helvetica')
      .text(empresa.correo || '—', colRightX, offsetTop + 15, {
        width: 250,
      });

    doc
      .font('Helvetica-Bold')
      .text('Ubicación', colLeftX, offsetTop + 55)
      .font('Helvetica')
      .text(empresa.ubicacion || '—', colLeftX, offsetTop + 70, {
        width: 250,
      });

    doc
      .font('Helvetica-Bold')
      .text('Ámbito', colRightX, offsetTop + 55)
      .font('Helvetica')
      .text(empresa.ambito || '—', colRightX, offsetTop + 70, {
        width: 250,
      });

    // === Misión y Visión (NO TOCAR) ===
    const bloqueCentralY = 385;
    doc
      .font('Helvetica-Bold')
      .text('Misión', colLeftX, bloqueCentralY)
      .font('Helvetica')
      .text(empresa.mision || '—', colLeftX, bloqueCentralY + 18, {
        width: pageWidth - colLeftX * 2,
        align: 'left',
      });

    let visionStartY = doc.y + 20;
    doc
      .font('Helvetica-Bold')
      .text('Visión', colLeftX, visionStartY)
      .font('Helvetica')
      .text(empresa.vision || '—', colLeftX, visionStartY + 18, {
        width: pageWidth - colLeftX * 2,
        align: 'left',
      });

    // === Bloque inferior (NO TOCAR) ===
    const bloqueInferiorY = 600;
    const derechaX = pageWidth / 2 + 130;

    doc
      .font('Helvetica-Bold')
      .text('Volumen de ventas anual', colLeftX, bloqueInferiorY)
      .font('Helvetica')
      .text(empresa.volumenVentas || '—', colLeftX, bloqueInferiorY + 16, {
        width: 250,
      });

    doc
      .font('Helvetica-Bold')
      .text('Antigüedad', derechaX, bloqueInferiorY)
      .font('Helvetica')
      .text(empresa.antiguedad || '—', derechaX, bloqueInferiorY + 16, {
        width: 250,
      });

    const empleadosY = bloqueInferiorY + 60;
    doc
      .font('Helvetica-Bold')
      .text('Empleados', colLeftX, empleadosY)
      .font('Helvetica')
      .text(
        empresa.empleados !== undefined && empresa.empleados !== null
          ? String(empresa.empleados)
          : '—',
        colLeftX,
        empleadosY + 16,
      );

    const serviciosY = bloqueInferiorY + 60;
    doc
      .font('Helvetica-Bold')
      .text('Servicios', derechaX, serviciosY)
      .font('Helvetica')
      .text(empresa.servicios || '—', derechaX, serviciosY + 16, {
        width: 250,
      });

    // === Importaciones / Exportaciones (BAJADAS 15 PX MÁS) ===
    const exportY = 780; // antes 765
    doc
      .font('Helvetica-Bold')
      .text('Importaciones', colLeftX, exportY)
      .font('Helvetica')
      .text(empresa.importaciones ? 'Sí' : 'No', colLeftX, exportY + 16);

    doc
      .font('Helvetica-Bold')
      .text('Exportaciones', derechaX, exportY)
      .font('Helvetica')
      .text(empresa.exportaciones ? 'Sí' : 'No', derechaX, exportY + 16);

    // === Pie ===
    doc
      .font('Helvetica')
      .fontSize(9)
      .fillColor('#6B7280')
      .text('Generado automáticamente por el sistema OMEC', 0, pageHeight - 18, {
        align: 'center',
      });

    doc.end();
    return new Promise((resolve, reject) => {
      stream.on('finish', () => resolve(`/uploads/${nombreArchivo}`));
      stream.on('error', reject);
    });
  }
}
