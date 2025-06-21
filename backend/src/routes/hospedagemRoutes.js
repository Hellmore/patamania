const express = require('express');
const router = express.Router();
const hospedagemController = require('../controllers/hospedagemController');

router.post('/cadastro', hospedagemController.cadastrar);
router.get('/lista', hospedagemController.listarTodos);
router.get('/buscar/:hospedagem_id', hospedagemController.buscarPorId);
router.put('/atualizar/:hospedagem_id', hospedagemController.atualizar);
router.delete('/deletar/:hospedagem_id', hospedagemController.deletar);

module.exports = router;