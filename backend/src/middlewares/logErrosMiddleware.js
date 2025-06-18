const logErroModel = require('../models/logErroModel');

module.exports = async (err, req, res, next) => {
  console.error(err.stack);

  try {
    await logErroModel.cadastrar({
      mensagem: err.message,
      stacktrace: err.stack,
      rota: req.originalUrl,
      usuario_id: req.usuario_id || null,
    });
  } catch (e) {
    console.error("Falha ao salvar log de erro:", e);
  }

  res.status(err.status || 500).send(`Erro interno no servidor: ${err.message || "Erro interno no servidor."}`);
};