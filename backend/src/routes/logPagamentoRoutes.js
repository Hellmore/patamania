const express = require('express');
const router = express.Router();
const logPagamentoController = require('../controllers/logPagamentoController');

router.post('/cadastro', logPagamentoController.cadastrar);
router.get('/lista', logPagamentoController.listarTodos);

module.exports = router;
