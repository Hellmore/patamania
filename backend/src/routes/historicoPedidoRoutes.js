const express = require('express');
const router = express.Router();
const historicoPedidoController = require('../controllers/historicoPedidoController');

router.post('/cadastro', historicoPedidoController.cadastrar);
router.get('/lista', historicoPedidoController.listarTodos);

module.exports = router;
