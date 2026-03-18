const express = require('express');
const router = express.Router();
const etudiantController = require('../controllers/etudiantController');
const { verifyToken, isAdmin, isProfesseur } = require('../middleware/auth');

router.post('/', [verifyToken, isAdmin], etudiantController.create);
router.get('/', [verifyToken], etudiantController.getAll);
router.get('/:id', [verifyToken], etudiantController.getOne);
router.put('/:id', [verifyToken, isAdmin], etudiantController.update);
router.delete('/:id', [verifyToken, isAdmin], etudiantController.delete);

module.exports = router;
