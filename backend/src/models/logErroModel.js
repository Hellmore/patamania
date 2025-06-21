const db = require('../utils/db');

const cadastrar = ({ mensagem, stacktrace, rota, usuario_id }) => {
  const query = `
    INSERT INTO log_erro (logerro_mensagem, logerro_stacktrace, logerro_rota, logerro_usuario_id)
    VALUES (?, ?, ?, ?)
  `;
  return new Promise((resolve, reject) => {
    db.query(query, [mensagem, stacktrace, rota, usuario_id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  cadastrar,
};