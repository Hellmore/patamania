const express = require('express');
const router = express.Router();
const avaliacaoServicoController = require('../controllers/avaliacaoServicoController');

router.post('/cadastro', avaliacaoServicoController.cadastrar);
router.get('/lista', avaliacaoServicoController.listar);
router.get('/buscar/:avaliacaoservico_id', avaliacaoServicoController.buscarPorId);
router.put('/atualizar/:avaliacaoservico_id', avaliacaoServicoController.atualizar);
router.delete('/deletar/:avaliacaoservico_id', avaliacaoServicoController.deletar);

module.exports = router;