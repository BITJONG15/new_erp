const { Filiere, Professeur, User, Matiere } = require('../models');

exports.create = async (req, res) => {
  try {
    const filiere = await Filiere.create(req.body);
    res.status(201).json({ success: true, data: filiere });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const filieres = await Filiere.findAll({
      include: [
        { 
          model: Professeur, 
          as: 'responsable',
          include: [{ model: User, as: 'user', attributes: ['nom_complet'] }]
        }
      ]
    });
    res.status(200).json({ success: true, data: filieres });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const filiere = await Filiere.findByPk(req.params.id, {
      include: [
        { 
          model: Professeur, 
          as: 'responsable',
          include: [{ model: User, as: 'user', attributes: ['nom_complet'] }]
        },
        { model: Matiere, as: 'matieres' }
      ]
    });
    if (!filiere) return res.status(404).json({ success: false, message: 'Filière non trouvée' });
    res.status(200).json({ success: true, data: filiere });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const filiere = await Filiere.findByPk(req.params.id);
    if (!filiere) return res.status(404).json({ success: false, message: 'Filière non trouvée' });
    
    await filiere.update(req.body);
    res.status(200).json({ success: true, data: filiere });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const filiere = await Filiere.findByPk(req.params.id);
    if (!filiere) return res.status(404).json({ success: false, message: 'Filière non trouvée' });
    
    await filiere.destroy();
    res.status(200).json({ success: true, message: 'Filière supprimée' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
