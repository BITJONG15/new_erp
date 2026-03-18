const { Note, Etudiant, Matiere, User } = require('../models');
const calculateNoteFinale = require('../utils/calculateNoteFinale');

exports.saisie = async (req, res) => {
  try {
    const { etudiant_id, matiere_id, note_cc, note_examen, session, annee_academique } = req.body;
    
    // Check if note already exists
    let note = await Note.findOne({ where: { etudiant_id, matiere_id, annee_academique } });
    
    const matiere = await Matiere.findByPk(matiere_id);
    const note_finale = calculateNoteFinale(note_cc, note_examen);
    
    if (note) {
      await note.update({ note_cc, note_examen, note_finale, session });
    } else {
      note = await Note.create({
        etudiant_id,
        matiere_id,
        note_cc,
        note_examen,
        note_finale,
        session,
        annee_academique
      });
    }
    
    res.status(200).json({ success: true, data: note });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getEtudiantsForMatiere = async (req, res) => {
  try {
    const matiereId = req.params.matiereId;
    const matiere = await Matiere.findByPk(matiereId);
    if (!matiere) return res.status(404).json({ success: false, message: 'Matière non trouvée' });

    const etudiants = await Etudiant.findAll({
      where: { filiere_id: matiere.filiere_id },
      include: [
        { model: User, as: 'user', attributes: ['nom_complet'] },
        { 
          model: Note, 
          as: 'notes',
          where: { matiere_id: matiereId },
          required: false // LEFT JOIN to get students even if they don't have notes yet
        }
      ]
    });
    res.status(200).json({ success: true, data: etudiants });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getByMatiere = async (req, res) => {
  try {
    const notes = await Note.findAll({
      where: { matiere_id: req.params.matiereId },
      include: [
        { 
          model: Etudiant, 
          as: 'etudiant',
          include: [{ model: User, as: 'user', attributes: ['nom_complet'] }]
        }
      ]
    });
    res.status(200).json({ success: true, data: notes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getByEtudiant = async (req, res) => {
  try {
    const notes = await Note.findAll({
      where: { etudiant_id: req.params.etudiantId },
      include: [
        { model: Matiere, as: 'matiere', attributes: ['nom', 'code', 'credit', 'coefficient'] }
      ]
    });
    res.status(200).json({ success: true, data: notes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.valider = async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);
    if (!note) return res.status(404).json({ success: false, message: 'Note non trouvée' });
    
    note.validee = true;
    await note.save();
    
    res.status(200).json({ success: true, data: note });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.generateReleve = async (req, res) => {
  // Implementation for PDF generation
  res.status(501).json({ success: false, message: 'Not implemented yet' });
};
