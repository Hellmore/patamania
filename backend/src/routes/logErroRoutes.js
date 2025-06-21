const express = require('express');
const router = express.Router();

router.get('/erro-programado', (req, res, next) => {
  // erro para teste
  const erro = new Error('Erro proposital para teste de log');
  erro.status = 500;
  next(erro);  // passa o erro para o middleware de erro
});

module.exports = router;