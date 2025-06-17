const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');
const verificarToken = require('../middlewares/jwtMiddleware');
const verificarAdmin = require('../middlewares/verificarAdmin');

router.get('/lista', produtoController.listarTodos); 
router.get('/buscar/:produto_id', verificarToken, produtoController.buscarPorId); 
router.post('/cadastro', verificarToken, verificarAdmin, produtoController.cadastrar);
router.put('/:produto_id', verificarToken, verificarAdmin, produtoController.atualizar);
router.delete('/:produto_id', verificarToken, verificarAdmin, produtoController.deletar);

module.exports = router;