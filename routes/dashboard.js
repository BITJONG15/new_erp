const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { verifyToken, isAdmin, isProfesseur, isEtudiant } = require('../middleware/auth');

router.get('/admin', [verifyToken, isAdmin], dashboardController.getAdminStats);
router.get('/professeur', [verifyToken, isProfesseur], dashboardController.getProfesseurStats);
router.get('/etudiant', [verifyToken, isEtudiant], dashboardController.getEtudiantStats);

module.exports = router;
