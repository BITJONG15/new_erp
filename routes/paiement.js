const express = require('express');
const router = express.Router();
const paiementController = require('../controllers/paiementController');
const { verifyToken, isAdmin } = require('../middleware/auth');

router.post('/', [verifyToken, isAdmin], paiementController.create);
router.get('/', [verifyToken, isAdmin], paiementController.getAll);
router.get('/etudiant/:etudiantId', [verifyToken], paiementController.getByEtudiant);
router.put('/:id', [verifyToken, isAdmin], paiementController.update);
router.get('/stats', [verifyToken, isAdmin], paiementController.stats);
router.get('/:id/recu', [verifyToken], paiementController.generateRecu);

module.exports = router;
