const { Matiere, Filiere, Professeur, User } = require('../models');

exports.create = async (req, res) => {
  try {
    const matiere = await Matiere.create(req.body);
    res.status(201).json({ success: true, data: matiere });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const matieres = await Matiere.findAll({
      include: [
        { model: Filiere, as: 'filiere', attributes: ['nom'] },
        { 
          model: Professeur, 
          as: 'professeur',
          include: [{ model: User, as: 'user', attributes: ['nom_complet'] }]
        }
      ]
    });
    res.status(200).json({ success: true, data: matieres });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const matiere = await Matiere.findByPk(req.params.id, {
      include: [
        { model: Filiere, as: 'filiere' },
        { 
          model: Professeur, 
          as: 'professeur',
          include: [{ model: User, as: 'user', attributes: ['nom_complet'] }]
        }
      ]
    });
    if (!matiere) return res.status(404).json({ success: false, message: 'Matière non trouvée' });
    res.status(200).json({ success: true, data: matiere });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const matiere = await Matiere.findByPk(req.params.id);
    if (!matiere) return res.status(404).json({ success: false, message: 'Matière non trouvée' });
    
    await matiere.update(req.body);
    res.status(200).json({ success: true, data: matiere });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const matiere = await Matiere.findByPk(req.params.id);
    if (!matiere) return res.status(404).json({ success: false, message: 'Matière non trouvée' });
    
    await matiere.destroy();
    res.status(200).json({ success: true, message: 'Matière supprimée' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMesMatieres = async (req, res) => {
  try {
    const professeur = await Professeur.findOne({ where: { user_id: req.userId } });
    if (!professeur) return res.status(404).json({ success: false, message: 'Professeur non trouvé' });

    const matieres = await Matiere.findAll({
      where: { professeur_id: professeur.id },
      include: [
        { model: Filiere, as: 'filiere', attributes: ['nom'] }
      ]
    });
    res.status(200).json({ success: true, data: matieres });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.assignProf = async (req, res) => {
  try {
    const matiere = await Matiere.findByPk(req.params.id);
    if (!matiere) return res.status(404).json({ success: false, message: 'Matière non trouvée' });
    
    matiere.professeur_id = req.body.professeur_id;
    await matiere.save();
    
    res.status(200).json({ success: true, data: matiere });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
