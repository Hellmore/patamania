const express = require('express');
const router = express.Router();
const cupomDescontoController = require('../controllers/cupomDescontoController');

router.post('/cadastro', cupomDescontoController.cadastrar);
router.get('/lista', cupomDescontoController.listarTodos);
router.get('/buscar/:cupom_codigo', cupomDescontoController.buscarPorCodigo);
router.delete('/deletar/:cupom_codigo', cupomDescontoController.deletar);

module.exports = router;
