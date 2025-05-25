const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

router.post('/cadastro', produtoController.cadastrar);

module.exports = router;