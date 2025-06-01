const db = require('../utils/db');

const cadastrar = (
  endereco_id,
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
      endereco_id,  
      usuario_id,
      endereco_logradouro,
      endereco_numero,
      endereco_complemento,
      endereco_bairro,
      endereco_cidade,
      endereco_estado,
      endereco_cep
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  return new Promise((resolve, reject) => {
    db.query(
      query,
      [endereco_id, usuario_id, logradouro, numero, complemento, bairro, cidade, estado, cep],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

module.exports = { cadastrar };