const express = require('express');
const router = express.Router();
const filiereController = require('../controllers/filiereController');
const { verifyToken, isAdmin } = require('../middleware/auth');

router.post('/', [verifyToken, isAdmin], filiereController.create);
router.get('/', [verifyToken], filiereController.getAll);
router.get('/:id', [verifyToken], filiereController.getOne);
router.put('/:id', [verifyToken, isAdmin], filiereController.update);
router.delete('/:id', [verifyToken, isAdmin], filiereController.delete);

module.exports = router;
