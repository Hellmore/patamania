const express = require('express');
const router = express.Router();
const enderecoController = require('../controllers/enderecoController');

router.post('/cadastro', enderecoController.cadastrar);
router.get('/lista', enderecoController.listar);
router.get('/buscar/:endereco_id', enderecoController.buscarPorId);
router.get('/buscar-por-user/:usuario_id', enderecoController.buscarPorUser);
router.put('/:usuario_id', enderecoController.atualizar);
router.delete('/deletar/:endereco_id', enderecoController.deletar);

module.exports = router;