const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken } = require('../middleware/auth');
const { check } = require('express-validator');
const { validate } = require('../middleware/validation');

router.post('/register', [
  check('nom_complet', 'Le nom complet est requis').not().isEmpty(),
  check('email', 'Veuillez inclure un email valide').isEmail(),
  check('mot_de_passe', 'Le mot de passe doit contenir au moins 6 caractères').isLength({ min: 6 }),
  check('role', 'Le rôle est requis').isIn(['admin', 'professeur', 'etudiant'])
], validate, authController.register);

router.post('/login', [
  check('email', 'Veuillez inclure un email valide').isEmail(),
  check('mot_de_passe', 'Le mot de passe est requis').exists()
], validate, authController.login);

router.get('/profile', verifyToken, authController.getProfile);

module.exports = router;
