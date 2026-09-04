import { createWriteStream } from 'node:fs';
import PDFDocument from 'pdfkit';
import { careerHistory, currentRole, site } from '../data/site.ts';
import { expertise } from '../data/expertise.ts';

const INK = '#17130f';
const MUTED = '#5c554d';
const ACCENT = '#1f6f5c';

/**
 * Generate a redacted, anonymized CV as a PDF (FR-020). No email, phone or home
 * address; employers and clients are described generically.
 */
export function generateCv(outPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margin: 56 });
    const stream = createWriteStream(outPath);
    stream.on('finish', () => resolve());
    stream.on('error', reject);
    doc.on('error', reject);
    doc.pipe(stream);

    const heading = (text: string): void => {
      doc.moveDown(0.8);
      doc.fillColor(ACCENT).fontSize(12).font('Helvetica-Bold').text(text.toUpperCase(), {
        characterSpacing: 1.2,
      });
      doc.moveDown(0.3);
    };

    const bullet = (text: string): void => {
      doc.fillColor(MUTED).fontSize(10).font('Helvetica').text(`•  ${text}`, { indent: 6 });
    };

    doc.fillColor(INK).fontSize(24).font('Helvetica-Bold').text(site.name);
    doc.fillColor(ACCENT).fontSize(12).font('Helvetica-Bold').text(site.title);
    doc
      .fillColor(MUTED)
      .fontSize(10)
      .font('Helvetica')
      .text(`LinkedIn: linkedin.com/in/frederik-r-38763a3`);

    heading('Profile');
    doc.fillColor(MUTED).fontSize(10).font('Helvetica').text(site.summary, { align: 'left' });

    heading('Current Role');
    doc
      .fillColor(INK)
      .fontSize(11)
      .font('Helvetica-Bold')
      .text(`${currentRole.role}, ${currentRole.period}`);
    doc.fillColor(MUTED).fontSize(10).font('Helvetica').text(currentRole.organization);
    doc.moveDown(0.2);
    doc.text(currentRole.scope);
    doc.moveDown(0.3);
    for (const outcome of currentRole.outcomes) bullet(outcome);

    heading('Experience');
    for (const role of careerHistory) {
      doc.fillColor(INK).fontSize(11).font('Helvetica-Bold').text(`${role.role}, ${role.period}`);
      doc.fillColor(MUTED).fontSize(10).font('Helvetica').text(role.organization);
      doc.moveDown(0.2);
      for (const h of role.highlights) bullet(h);
      doc.moveDown(0.3);
    }

    heading('Expertise');
    for (const group of expertise) {
      doc.fillColor(INK).fontSize(10).font('Helvetica-Bold').text(`${group.category}: `, {
        continued: true,
      });
      doc.fillColor(MUTED).font('Helvetica').text(group.items.join(', '));
    }

    doc.moveDown(1);
    doc
      .fillColor(MUTED)
      .fontSize(8)
      .font('Helvetica-Oblique')
      .text(
        'Redacted CV, client names are anonymized; personal contact details are available on request via LinkedIn.',
      );

    doc.end();
  });
}
