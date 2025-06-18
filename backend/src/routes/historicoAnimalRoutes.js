const express = require('express');
const router = express.Router();
const historicoAnimalController = require('../controllers/historicoAnimalController');

router.post('/cadastro', historicoAnimalController.cadastrar);
router.get('/lista', historicoAnimalController.listarTodos);
router.get('/buscar/:historicoanimal_id', historicoAnimalController.buscarPorId);

module.exports = router;