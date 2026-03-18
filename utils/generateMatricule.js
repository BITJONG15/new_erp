const { Etudiant } = require('../models');

module.exports = async () => {
  const annee = new Date().getFullYear();
  
  const dernierEtudiant = await Etudiant.findOne({
    order: [['id', 'DESC']]
  });
  
  let dernierNumero = 0;
  if (dernierEtudiant && dernierEtudiant.matricule.startsWith(`IHTM${annee}`)) {
    dernierNumero = parseInt(dernierEtudiant.matricule.slice(-3));
  }
  
  const nouveauNumero = (dernierNumero + 1).toString().padStart(3, '0');
  return `IHTM${annee}${nouveauNumero}`;
};
