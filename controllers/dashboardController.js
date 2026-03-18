const { Etudiant, Professeur, Filiere, Matiere, Annonce, Paiement } = require('../models');

exports.getAdminStats = async (req, res) => {
  try {
    const totalEtudiants = await Etudiant.count();
    const totalProfesseurs = await Professeur.count();
    const totalFilieres = await Filiere.count();
    const totalMatieres = await Matiere.count();
    const totalEncaisse = await Paiement.sum('montant');
    
    res.status(200).json({
      success: true,
      data: {
        totalEtudiants,
        totalProfesseurs,
        totalFilieres,
        totalMatieres,
        totalEncaisse: totalEncaisse || 0
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getProfesseurStats = async (req, res) => {
  try {
    const professeur = await Professeur.findOne({ where: { user_id: req.userId } });
    if (!professeur) return res.status(404).json({ success: false, message: 'Professeur non trouvé' });
    
    const totalMatieres = await Matiere.count({ where: { professeur_id: professeur.id } });
    
    res.status(200).json({
      success: true,
      data: {
        totalMatieres,
        chargeHoraire: professeur.charge_horaire
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getEtudiantStats = async (req, res) => {
  try {
    const etudiant = await Etudiant.findOne({ where: { user_id: req.userId } });
    if (!etudiant) return res.status(404).json({ success: false, message: 'Etudiant non trouvé' });
    
    const totalPaye = await Paiement.sum('montant', { where: { etudiant_id: etudiant.id } });
    const resteAPayer = (etudiant.montant_frais || 0) - (totalPaye || 0);
    
    res.status(200).json({
      success: true,
      data: {
        fraisPayer: etudiant.frais_payer,
        montantFrais: etudiant.montant_frais,
        totalPaye: totalPaye || 0,
        resteAPayer: resteAPayer > 0 ? resteAPayer : 0
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
