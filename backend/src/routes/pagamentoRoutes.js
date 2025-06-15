const express = require('express');
const router = express.Router();
const pagamentoController = require('../controllers/pagamentoController');

router.post('/cadastro', pagamentoController.cadastrar);
router.get('/lista', pagamentoController.listarTodos);
router.get('/buscar/:pagamento_id', pagamentoController.buscarPorId);
router.put('/atualizar/:pagamento_id', pagamentoController.atualizar);
router.delete('/deletar/:pagamento_id', pagamentoController.deletar);

module.exports = router;
