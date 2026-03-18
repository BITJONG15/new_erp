const express = require('express');
const router = express.Router();
const professeurController = require('../controllers/professeurController');
const { verifyToken, isAdmin } = require('../middleware/auth');

router.post('/', [verifyToken, isAdmin], professeurController.create);
router.get('/', [verifyToken, isAdmin], professeurController.getAll);
router.get('/:id', [verifyToken], professeurController.getOne);
router.put('/:id', [verifyToken, isAdmin], professeurController.update);
router.delete('/:id', [verifyToken, isAdmin], professeurController.delete);

module.exports = router;
