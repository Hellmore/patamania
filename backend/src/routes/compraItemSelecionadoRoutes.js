const express = require('express');
const router = express.Router();
const compraItemSelecionadoController = require('../controllers/compraItemSelecionadoController');

router.post('/cadastro', compraItemSelecionadoController.cadastrar);
router.get('/lista', compraItemSelecionadoController.listarTodos);
router.delete('/remover', compraItemSelecionadoController.deletar);

module.exports = router;
