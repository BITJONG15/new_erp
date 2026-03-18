const express = require('express');
const router = express.Router();
const annonceController = require('../controllers/annonceController');
const { verifyToken, isAdmin, isProfesseur } = require('../middleware/auth');

router.post('/', [verifyToken, isProfesseur], annonceController.create);
router.get('/', [verifyToken], annonceController.getAll);
router.get('/:id', [verifyToken], annonceController.getOne);
router.put('/:id', [verifyToken, isAdmin], annonceController.update);
router.delete('/:id', [verifyToken, isAdmin], annonceController.delete);
router.post('/:id/vu', [verifyToken], annonceController.markAsVu);

module.exports = router;
