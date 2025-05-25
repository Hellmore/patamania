const express = require('express');
const router = express.Router();
const { cadastrarUsuario } = require('../controllers/usuarioController');

router.post('/cadastro', cadastrarUsuario);

module.exports = router;
