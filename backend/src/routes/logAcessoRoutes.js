const express = require('express');
const router = express.Router();
const logAcessoController = require('../controllers/logAcessoController');

router.post('/cadastro', logAcessoController.cadastrar);
router.get('/lista', logAcessoController.listarTodos);
router.get('/buscar/:logacesso_id', logAcessoController.buscarPorLogacessoId);

module.exports = router;