const { Paiement, Etudiant, User, Filiere } = require('../models');

exports.create = async (req, res) => {
  try {
    const paiement = await Paiement.create(req.body);
    
    // Mettre à jour le statut de paiement de l'étudiant
    const etudiant = await Etudiant.findByPk(req.body.etudiant_id);
    if (etudiant) {
      const totalPaye = await Paiement.sum('montant', { where: { etudiant_id: etudiant.id } });
      if (totalPaye >= etudiant.montant_frais) {
        etudiant.frais_payer = true;
        await etudiant.save();
      }
    }
    
    res.status(201).json({ success: true, data: paiement });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const paiements = await Paiement.findAll({
      include: [
        { 
          model: Etudiant, 
          as: 'etudiant',
          include: [
            { model: User, as: 'user', attributes: ['nom_complet'] },
            { model: Filiere, as: 'filiere', attributes: ['nom'] }
          ]
        }
      ],
      order: [['date_paiement', 'DESC']]
    });
    res.status(200).json({ success: true, data: paiements });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getByEtudiant = async (req, res) => {
  try {
    const paiements = await Paiement.findAll({
      where: { etudiant_id: req.params.etudiantId },
      order: [['date_paiement', 'DESC']]
    });
    res.status(200).json({ success: true, data: paiements });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const paiement = await Paiement.findByPk(req.params.id);
    if (!paiement) return res.status(404).json({ success: false, message: 'Paiement non trouvé' });
    
    await paiement.update(req.body);
    res.status(200).json({ success: true, data: paiement });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.stats = async (req, res) => {
  try {
    const totalEncaisse = await Paiement.sum('montant');
    
    const etudiants = await Etudiant.findAll();
    let totalAttendu = 0;
    etudiants.forEach(e => {
      totalAttendu += Number(e.montant_frais || 0);
    });
    
    const impayes = totalAttendu - (totalEncaisse || 0);
    
    res.status(200).json({ 
      success: true, 
      data: {
        totalEncaisse: totalEncaisse || 0,
        totalAttendu,
        impayes
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.generateRecu = async (req, res) => {
  res.status(501).json({ success: false, message: 'Not implemented yet' });
};
