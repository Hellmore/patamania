const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

router.post('/cadastro', produtoController.cadastrar);
router.get('/lista', produtoController.listarTodos); 
router.get('/buscar/:produto_id', produtoController.buscarPorId); 
router.put('/atualizar/:produto_id', produtoController.atualizar);     
router.delete('/deletar/:produto_id', produtoController.deletar);

module.exports = router;