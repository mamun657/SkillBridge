import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';

const ensureCertDir = () => {
  const certDir = path.join(process.cwd(), 'public', 'certs');
  if (!fs.existsSync(certDir)) {
    fs.mkdirSync(certDir, { recursive: true });
  }
  return certDir;
};

export const issueCertificate = async ({
  userId,
  name,
  courseId,
  courseName
}) => {
  const certDir = ensureCertDir();
  const filename = `${userId}-${courseId}-${Date.now()}.pdf`;
  const outputPath = path.join(certDir, filename);

  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', layout: 'landscape' });
    const stream = fs.createWriteStream(outputPath);

    doc.pipe(stream);

    doc
      .fontSize(36)
      .text('SkillBridge Micro-Certificate', { align: 'center' });
    doc.moveDown();
    doc.fontSize(20).text('This certifies that', { align: 'center' });
    doc
      .moveDown()
      .fontSize(28)
      .text(name, { align: 'center', underline: true });
    doc.moveDown();
    doc
      .fontSize(20)
      .text(`has completed "${courseName}"`, { align: 'center' });
    doc
      .moveDown(2)
      .fontSize(14)
      .text(`Course ID: ${courseId}`, { align: 'center' });
    doc.fontSize(12).text(`Issued: ${new Date().toLocaleDateString()}`, {
      align: 'center'
    });
    doc.end();

    stream.on('finish', () => {
      const url = `/public/certs/${filename}`;
      resolve({ path: outputPath, url });
    });
    stream.on('error', reject);
  });
};
