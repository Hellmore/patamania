const express = require('express');
const router = express.Router();
const itemCarrinhoController = require('../controllers/itemCarrinhoController');

router.post('/cadastro', itemCarrinhoController.cadastrar);
router.get('/lista', itemCarrinhoController.listarTodos);
router.get('/buscar/:item_id', itemCarrinhoController.buscarPorId);
router.put('/atualizar/:item_id', itemCarrinhoController.atualizar);
router.delete('/deletar/:item_id', itemCarrinhoController.deletar);
router.get('/usuario/:usuario_id', itemCarrinhoController.buscarPorUsuario);

module.exports = router;
