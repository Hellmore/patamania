const express = require('express');
const router = express.Router();
const banhoETosaController = require('../controllers/banhoETosaController');

router.post('/cadastro', banhoETosaController.cadastrar);
router.get('/lista', banhoETosaController.listarTodos);
router.get('/buscar/:banhoetosa_id', banhoETosaController.buscarPorId);
router.put('/atualizar/:banhoetosa_id', banhoETosaController.atualizar);
router.delete('/deletar/:banhoetosa_id', banhoETosaController.deletar);

module.exports = router;