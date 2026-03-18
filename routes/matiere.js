const express = require('express');
const router = express.Router();
const matiereController = require('../controllers/matiereController');
const { verifyToken, isAdmin } = require('../middleware/auth');

router.post('/', [verifyToken, isAdmin], matiereController.create);
router.get('/', [verifyToken], matiereController.getAll);
router.get('/professeur/me', [verifyToken], matiereController.getMesMatieres);
router.get('/:id', [verifyToken], matiereController.getOne);
router.put('/:id', [verifyToken, isAdmin], matiereController.update);
router.delete('/:id', [verifyToken, isAdmin], matiereController.delete);
router.post('/:id/assign-prof', [verifyToken, isAdmin], matiereController.assignProf);

module.exports = router;
