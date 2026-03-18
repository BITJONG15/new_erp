const { Professeur, User, Matiere } = require('../models');
const bcrypt = require('bcryptjs');

exports.create = async (req, res) => {
  try {
    const { nom_complet, email, specialite, grade, date_embauche, type_contrat, charge_horaire } = req.body;
    
    const user = await User.create({
      nom_complet,
      email,
      mot_de_passe: bcrypt.hashSync('default123', 10),
      role: 'professeur'
    });
    
    const professeur = await Professeur.create({
      user_id: user.id,
      specialite,
      grade,
      date_embauche,
      type_contrat,
      charge_horaire
    });
    
    res.status(201).json({ success: true, data: professeur });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const professeurs = await Professeur.findAll({
      include: [
        { model: User, as: 'user', attributes: ['nom_complet', 'email', 'statut'] }
      ]
    });
    res.status(200).json({ success: true, data: professeurs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const professeur = await Professeur.findByPk(req.params.id, {
      include: [
        { model: User, as: 'user', attributes: { exclude: ['mot_de_passe'] } },
        { model: Matiere, as: 'matieres' }
      ]
    });
    if (!professeur) return res.status(404).json({ success: false, message: 'Professeur non trouvé' });
    res.status(200).json({ success: true, data: professeur });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const professeur = await Professeur.findByPk(req.params.id);
    if (!professeur) return res.status(404).json({ success: false, message: 'Professeur non trouvé' });
    
    await professeur.update(req.body);
    res.status(200).json({ success: true, data: professeur });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const professeur = await Professeur.findByPk(req.params.id);
    if (!professeur) return res.status(404).json({ success: false, message: 'Professeur non trouvé' });
    
    await professeur.destroy();
    res.status(200).json({ success: true, message: 'Professeur supprimé' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
