const { EmploiTemps, Matiere, Filiere, Professeur, User } = require('../models');

exports.create = async (req, res) => {
  try {
    const seance = await EmploiTemps.create(req.body);
    res.status(201).json({ success: true, data: seance });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const seances = await EmploiTemps.findAll({
      include: [
        { 
          model: Matiere, 
          as: 'matiere',
          include: [
            { model: Filiere, as: 'filiere', attributes: ['nom'] },
            { model: Professeur, as: 'professeur', include: [{ model: User, as: 'user', attributes: ['nom_complet'] }] }
          ]
        }
      ]
    });
    res.status(200).json({ success: true, data: seances });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getByFiliere = async (req, res) => {
  try {
    const seances = await EmploiTemps.findAll({
      include: [
        { 
          model: Matiere, 
          as: 'matiere',
          where: { filiere_id: req.params.filiereId },
          include: [
            { model: Professeur, as: 'professeur', include: [{ model: User, as: 'user', attributes: ['nom_complet'] }] }
          ]
        }
      ]
    });
    res.status(200).json({ success: true, data: seances });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getByProfesseur = async (req, res) => {
  try {
    const seances = await EmploiTemps.findAll({
      include: [
        { 
          model: Matiere, 
          as: 'matiere',
          where: { professeur_id: req.params.profId },
          include: [
            { model: Filiere, as: 'filiere', attributes: ['nom'] }
          ]
        }
      ]
    });
    res.status(200).json({ success: true, data: seances });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMonEmploiTemps = async (req, res) => {
  try {
    const professeur = await Professeur.findOne({ where: { user_id: req.userId } });
    if (!professeur) return res.status(404).json({ success: false, message: 'Professeur non trouvé' });

    const seances = await EmploiTemps.findAll({
      include: [
        { 
          model: Matiere, 
          as: 'matiere',
          where: { professeur_id: professeur.id },
          include: [
            { model: Filiere, as: 'filiere', attributes: ['nom'] }
          ]
        }
      ]
    });
    res.status(200).json({ success: true, data: seances });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getBySalle = async (req, res) => {
  try {
    const seances = await EmploiTemps.findAll({
      where: { salle: req.params.salle },
      include: [
        { model: Matiere, as: 'matiere', attributes: ['nom', 'code'] }
      ]
    });
    res.status(200).json({ success: true, data: seances });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const seance = await EmploiTemps.findByPk(req.params.id);
    if (!seance) return res.status(404).json({ success: false, message: 'Séance non trouvée' });
    
    await seance.update(req.body);
    res.status(200).json({ success: true, data: seance });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const seance = await EmploiTemps.findByPk(req.params.id);
    if (!seance) return res.status(404).json({ success: false, message: 'Séance non trouvée' });
    
    await seance.destroy();
    res.status(200).json({ success: true, message: 'Séance supprimée' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
