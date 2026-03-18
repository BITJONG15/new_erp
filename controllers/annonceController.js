const { Annonce, User } = require('../models');

exports.create = async (req, res) => {
  try {
    const annonce = await Annonce.create({
      ...req.body,
      auteur_id: req.userId
    });
    res.status(201).json({ success: true, data: annonce });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const annonces = await Annonce.findAll({
      include: [{ model: User, as: 'auteur', attributes: ['nom_complet', 'role'] }],
      order: [['date_publication', 'DESC']]
    });
    res.status(200).json({ success: true, data: annonces });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const annonce = await Annonce.findByPk(req.params.id, {
      include: [{ model: User, as: 'auteur', attributes: ['nom_complet', 'role'] }]
    });
    if (!annonce) return res.status(404).json({ success: false, message: 'Annonce non trouvée' });
    res.status(200).json({ success: true, data: annonce });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const annonce = await Annonce.findByPk(req.params.id);
    if (!annonce) return res.status(404).json({ success: false, message: 'Annonce non trouvée' });
    
    await annonce.update(req.body);
    res.status(200).json({ success: true, data: annonce });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const annonce = await Annonce.findByPk(req.params.id);
    if (!annonce) return res.status(404).json({ success: false, message: 'Annonce non trouvée' });
    
    await annonce.destroy();
    res.status(200).json({ success: true, message: 'Annonce supprimée' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.markAsVu = async (req, res) => {
  try {
    const annonce = await Annonce.findByPk(req.params.id);
    if (!annonce) return res.status(404).json({ success: false, message: 'Annonce non trouvée' });
    
    let vu_par = annonce.vu_par || [];
    if (!vu_par.includes(req.userId)) {
      vu_par.push(req.userId);
      annonce.vu_par = vu_par;
      await annonce.save();
    }
    
    res.status(200).json({ success: true, data: annonce });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
