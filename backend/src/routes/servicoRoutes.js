const express = require('express');
const router = express.Router();
const servicoController = require('../controllers/servicoController');

router.post('/cadastro', servicoController.cadastrar);
router.get('/lista', servicoController.listarTodos);
router.get('/buscar/:servico_id', servicoController.buscarPorId);
router.put('/atualizar/:servico_id', servicoController.atualizar);
router.delete('/deletar/:servico_id', servicoController.deletar);

module.exports = router;