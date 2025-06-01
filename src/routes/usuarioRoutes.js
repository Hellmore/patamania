const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.post('/cadastro', usuarioController.cadastrar);
router.get('/lista', usuarioController.listar);
router.get('/buscar/:usuario_id', usuarioController.buscarPorId);
router.put('/atualizar/:usuario_id', usuarioController.atualizar);
router.delete('/deletar/:usuario_id', usuarioController.excluir);

module.exports = router;