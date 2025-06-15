const express = require('express');
const router = express.Router();
const avaliacaoProdutoController = require('../controllers/avaliacaoProdutoController');

router.post('/cadastro', avaliacaoProdutoController.cadastrar);
router.get('/lista', avaliacaoProdutoController.listar);
router.get('/buscar/:avaliacaoproduto_id', avaliacaoProdutoController.buscarPorId);
router.put('/atualizar/:avaliacaoproduto_id', avaliacaoProdutoController.atualizar);
router.delete('/deletar/:avaliacaoproduto_id', avaliacaoProdutoController.deletar);

module.exports = router;