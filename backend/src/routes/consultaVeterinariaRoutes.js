const express = require('express');
const router = express.Router();
const consultaVeterinariaController = require('../controllers/consultaVeterinariaController');

router.post('/cadastro', consultaVeterinariaController.cadastrar);
router.get('/lista', consultaVeterinariaController.listarTodos);
router.get('/buscar/:consultaveterinaria_id', consultaVeterinariaController.buscarPorId);
router.put('/atualizar/:consultaveterinaria_id', consultaVeterinariaController.atualizar);
router.delete('/deletar/:consultaveterinaria_id', consultaVeterinariaController.deletar);

module.exports = router;