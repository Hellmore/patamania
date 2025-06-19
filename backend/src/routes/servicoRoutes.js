const express = require('express');
const router = express.Router();
const servicoController = require('../controllers/servicoController');
const verificarToken = require('../middlewares/jwtMiddleware');
const verificarAdmin = require('../middlewares/verificarAdmin');

router.get('/lista', servicoController.listarTodos);
router.get('/listar-com-responsaveis-e-criador', verificarToken, verificarAdmin, servicoController.listarComResponsaveisECriador );
router.get('/buscar/:produto_id', verificarToken, servicoController.buscarPorId); 
router.post('/cadastro', verificarToken, verificarAdmin, servicoController.cadastrar);
router.put('/:servico_id', verificarToken, verificarAdmin, servicoController.atualizar);
router.delete('/:servico_id', verificarToken, verificarAdmin, servicoController.deletar);

module.exports = router;