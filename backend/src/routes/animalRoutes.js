const express = require('express');
const router = express.Router();
const animalController = require('../controllers/animalController');

router.post('/cadastro', animalController.cadastrar);
router.get('/lista', animalController.listarTodos);
router.get('/buscar/:animal_id', animalController.buscarPorId);
router.get('/buscar-por-dono/:usuario_id', animalController.buscarPorDono);
router.put('/atualizar/:animal_id', animalController.atualizar);
router.delete('/deletar/:animal_id', animalController.deletar);

module.exports = router;