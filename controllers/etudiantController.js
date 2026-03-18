const { Etudiant, User, Filiere, Note, Paiement, EmploiTemps } = require('../models');
const generateMatricule = require('../utils/generateMatricule');
const bcrypt = require('bcryptjs');

exports.create = async (req, res) => {
  try {
    const { nom_complet, email, filiere_id, date_naissance, lieu_naissance, nationalite, annee_etude, montant_frais } = req.body;
    
    const user = await User.create({
      nom_complet,
      email,
      mot_de_passe: bcrypt.hashSync('default123', 10),
      role: 'etudiant'
    });
    
    const matricule = await generateMatricule();
    
    const etudiant = await Etudiant.create({
      user_id: user.id,
      matricule,
      filiere_id,
      date_naissance,
      lieu_naissance,
      nationalite,
      annee_etude,
      montant_frais
    });
    
    res.status(201).json({ success: true, data: etudiant });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const etudiants = await Etudiant.findAll({
      include: [
        { model: User, as: 'user', attributes: ['nom_complet', 'email', 'statut'] },
        { model: Filiere, as: 'filiere', attributes: ['nom'] }
      ]
    });
    res.status(200).json({ success: true, data: etudiants });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const etudiant = await Etudiant.findByPk(req.params.id, {
      include: [
        { model: User, as: 'user', attributes: { exclude: ['mot_de_passe'] } },
        { model: Filiere, as: 'filiere' }
      ]
    });
    if (!etudiant) return res.status(404).json({ success: false, message: 'Etudiant non trouvé' });
    res.status(200).json({ success: true, data: etudiant });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const etudiant = await Etudiant.findByPk(req.params.id);
    if (!etudiant) return res.status(404).json({ success: false, message: 'Etudiant non trouvé' });
    
    await etudiant.update(req.body);
    res.status(200).json({ success: true, data: etudiant });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const etudiant = await Etudiant.findByPk(req.params.id);
    if (!etudiant) return res.status(404).json({ success: false, message: 'Etudiant non trouvé' });
    
    await etudiant.destroy();
    res.status(200).json({ success: true, message: 'Etudiant supprimé' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
