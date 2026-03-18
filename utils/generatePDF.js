const PDFDocument = require('pdfkit');

exports.generateReleve = (etudiant, notes, res) => {
  const doc = new PDFDocument();
  
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=releve-${etudiant.matricule}.pdf`);
  
  doc.pipe(res);
  
  doc.fontSize(20).text('IHTM - Relevé de notes', { align: 'center' });
  doc.moveDown();
  doc.fontSize(14).text(`Étudiant: ${etudiant.user.nom_complet}`);
  doc.text(`Matricule: ${etudiant.matricule}`);
  doc.moveDown();
  
  notes.forEach(note => {
    doc.fontSize(12).text(`${note.matiere.nom}: ${note.note_finale}/20`);
  });
  
  doc.end();
};

exports.generateRecu = (paiement, res) => {
  const doc = new PDFDocument();
  
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=recu-${paiement.reference}.pdf`);
  
  doc.pipe(res);
  
  doc.fontSize(20).text('IHTM - Reçu de paiement', { align: 'center' });
  doc.moveDown();
  doc.fontSize(14).text(`Référence: ${paiement.reference}`);
  doc.text(`Montant: ${paiement.montant} FCFA`);
  doc.text(`Date: ${paiement.date_paiement}`);
  
  doc.end();
};
