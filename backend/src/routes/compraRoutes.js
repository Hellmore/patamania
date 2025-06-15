const express = require('express');
const router = express.Router();
const compraController = require('../controllers/compraController');

router.get('/lista', compraController.listarTodos);
router.get('/buscar/:compra_id', compraController.buscarPorId);
router.get('/usuario/:usuario_id', compraController.buscarPorUsuario);
router.delete('/deletar/:compra_id', compraController.deletar);

module.exports = router;
