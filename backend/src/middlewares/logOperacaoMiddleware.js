const db = require('../utils/db');

const rotasIgnoradas = [
  '/login',
  '/log-erro',
  '/log_pagamento'
];

const logOperacaoMiddleware = (req, res, next) => {
  const metodo = req.method;
  const operacoesPermitidas = ['POST', 'PUT', 'PATCH', 'DELETE'];

  if (!operacoesPermitidas.includes(metodo)) {
    return next();
  }

  const rota = req.originalUrl.split('?')[0];
  const rotaBase = '/' + rota.split('/')[1];

  if (rotasIgnoradas.includes(rotaBase)) {
    return next();
  }

  const partes = rota.split('/');
  const tabela = partes[1] ? partes[1].replace(/-/g, '_') : 'desconhecida';

  res.on('finish', () => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      const usuario_id = req.usuario?.id || null;

      const operacao =
        metodo === 'POST'
          ? 'INSERCAO'
          : metodo === 'PUT' || metodo === 'PATCH'
          ? 'ATUALIZACAO'
          : metodo === 'DELETE'
          ? 'EXCLUSAO'
          : 'OUTRO';

      const descricao = `${operacao} na tabela ${tabela} via rota ${rota}`;

      const sql = `
        INSERT INTO log_operacao (
          usuario_id,
          log_tabela,
          log_operacao,
          log_descricao,
          log_datahora
        ) VALUES (?, ?, ?, ?, NOW())
      `;

      db.query(
        sql,
        [usuario_id, tabela, operacao, descricao],
        (err) => {
          if (err) {
            console.error('❌ Erro ao salvar log de operação:', err);
          } else {
            console.log(`✅ Log de operação salvo para tabela [${tabela}]!`);
          }
        }
      );
    }
  });

  next();
};

module.exports = logOperacaoMiddleware;
