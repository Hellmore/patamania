const express = require('express');
const router = express.Router();
const passeioController = require('../controllers/passeioController');

router.post('/cadastro', passeioController.cadastrar);
router.get('/lista', passeioController.listarTodos);
router.get('/buscar/:passeio_id', passeioController.buscarPorId);
router.put('/atualizar/:passeio_id', passeioController.atualizar);
router.delete('/deletar/:passeio_id', passeioController.deletar);

module.exports = router;