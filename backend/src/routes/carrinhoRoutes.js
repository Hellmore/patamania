const express = require('express');
const router = express.Router();
const carrinhoController = require('../controllers/carrinhoController');

router.post('/cadastro', carrinhoController.cadastrar);
router.get('/lista', carrinhoController.listarTodos);
router.get('/buscar/:carrinho_id', carrinhoController.buscarPorId);
router.put('/atualizar/:carrinho_id', carrinhoController.atualizar);
router.delete('/deletar/:carrinho_id', carrinhoController.deletar);

module.exports = router;
