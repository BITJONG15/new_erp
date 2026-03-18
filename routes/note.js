const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');
const { verifyToken, isAdmin, isProfesseur } = require('../middleware/auth');

router.post('/saisie', [verifyToken, isProfesseur], noteController.saisie);
router.get('/matiere/:matiereId/etudiants', [verifyToken, isProfesseur], noteController.getEtudiantsForMatiere);
router.get('/matiere/:matiereId', [verifyToken], noteController.getByMatiere);
router.get('/etudiant/:etudiantId', [verifyToken], noteController.getByEtudiant);
router.post('/:id/valider', [verifyToken, isAdmin], noteController.valider);
router.get('/releve/:etudiantId', [verifyToken], noteController.generateReleve);

module.exports = router;
