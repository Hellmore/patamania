const db = require('../utils/db');

const rotasIgnoradas = [
  '/login',
  '/log-erro',
  '/log_pagamento',
  '/log_sistema'
];

const logSistemaMiddleware = (req, res, next) => {
  const metodo = req.method;
  const operacoesPermitidas = ['POST', 'PUT', 'PATCH', 'DELETE'];

  const rota = req.originalUrl.split('?')[0];
  const rotaBase = '/' + rota.split('/')[1];

  if (rotasIgnoradas.includes(rotaBase)) {
    return next();
  }

  const partes = rota.split('/');
  const entidade = partes[1] ? partes[1].replace(/-/g, '_') : 'desconhecida';

  const nivel =
    metodo === 'DELETE'
      ? 'ALERTA'
      : metodo === 'POST' || metodo === 'PUT' || metodo === 'PATCH'
      ? 'INFO'
      : 'INFO';

  res.on('finish', () => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      const usuario_id = req.usuario?.id || null;
      const evento = `${metodo} ${rota}`;
      const mensagem = `Operação ${metodo} executada na entidade ${entidade}`;
      const detalhes = `Detalhes: ${metodo} realizado na rota ${rota} (Status: ${res.statusCode})`;

      const sql = `
        INSERT INTO log_sistema (
          log_nivel,
          log_evento,
          log_mensagem,
          log_detalhes,
          log_usuario_id,
          log_datahora
        ) VALUES (?, ?, ?, ?, ?, NOW())
      `;

      db.query(
        sql,
        [nivel, evento, mensagem, detalhes, usuario_id],
        (err) => {
          if (err) {
            console.error('❌ Erro ao salvar log do sistema:', err);
          } else {
            console.log(`✅ Log do sistema salvo para rota [${rota}]!`);
          }
        }
      );
    }
  });

  next();
};

module.exports = logSistemaMiddleware;