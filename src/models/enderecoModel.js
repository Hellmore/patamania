const db = require('../utils/db');

const cadastrar = (
  usuario_id,
  logradouro,
  numero,
  complemento,
  bairro,
  cidade,
  estado,
  cep
) => {
  const query = `
    INSERT INTO endereco (
      usuario_id,
      endereco_logradouro,
      endereco_numero,
      endereco_complemento,
      endereco_bairro,
      endereco_cidade,
      endereco_estado,
      endereco_cep
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  return new Promise((resolve, reject) => {
    db.query(
      query,
      [usuario_id, logradouro, numero, complemento, bairro, cidade, estado, cep],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

module.exports = { cadastrar };