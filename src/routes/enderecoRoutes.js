const express = require('express');
const router = express.Router();
const enderecoController = require('../controllers/enderecoController');

router.post('/cadastro', enderecoController.cadastrar);

module.exports = router;