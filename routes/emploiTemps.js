const express = require('express');
const router = express.Router();
const emploiTempsController = require('../controllers/emploiTempsController');
const { verifyToken, isAdmin } = require('../middleware/auth');

router.post('/', [verifyToken, isAdmin], emploiTempsController.create);
router.get('/', [verifyToken], emploiTempsController.getAll);
router.get('/filiere/:filiereId', [verifyToken], emploiTempsController.getByFiliere);
router.get('/professeur/me', [verifyToken], emploiTempsController.getMonEmploiTemps);
router.get('/professeur/:profId', [verifyToken], emploiTempsController.getByProfesseur);
router.get('/salle/:salle', [verifyToken], emploiTempsController.getBySalle);
router.put('/:id', [verifyToken, isAdmin], emploiTempsController.update);
router.delete('/:id', [verifyToken, isAdmin], emploiTempsController.delete);

module.exports = router;
