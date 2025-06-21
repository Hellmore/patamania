const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const verificarToken = require('../middlewares/jwtMiddleware');
const verificarAdmin = require('../middlewares/verificarAdmin');

router.get('/lista', usuarioController.listar);
router.get('/admin', verificarToken, usuarioController.listarAdministradores);
router.get('/buscar/:usuario_id', verificarToken, usuarioController.buscarPorId); 
router.post('/cadastro', usuarioController.cadastrar);
router.put('/:usuario_id', verificarToken, usuarioController.atualizar);
router.delete('/:usuario_id', verificarToken, verificarAdmin, usuarioController.excluir);
router.delete('/deletar/:usuario_id', verificarToken, usuarioController.excluir);

module.exports = router;
