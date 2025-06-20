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
        resolve({ endereco_id: result.insertId, ...result });
      }
    );
  });
};

const listar = () => {
  const query = `SELECT * FROM endereco`;
  return new Promise((resolve, reject) => {
    db.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const buscarPorId = (endereco_id) => {
  const query = `SELECT * FROM endereco WHERE endereco_id = ?`;
  return new Promise((resolve, reject) => {
    db.query(query, [endereco_id], (err, result) => {
      if (err) return reject(err);
      resolve(result[0]);
    });
  });
};

const buscarPorUser = (usuario_id) => {
  const query = `SELECT * FROM endereco WHERE usuario_id = ?`;
  return new Promise((resolve, reject) => {
    db.query(query, [usuario_id], (err, result) => {
      if (err) return reject(err);
      resolve(result[0]);
    });
  });
};

const atualizar = (
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
    UPDATE endereco SET
      endereco_logradouro = ?,
      endereco_numero = ?,
      endereco_complemento = ?,
      endereco_bairro = ?,
      endereco_cidade = ?,
      endereco_estado = ?,
      endereco_cep = ?
    WHERE usuario_id = ?
  `;

  console.log("Query SQL:", query);
  console.log("Valores:", [logradouro, numero, complemento, bairro, cidade, estado, cep, usuario_id]);
  return new Promise((resolve, reject) => {
    db.query(
      query,
      [logradouro, numero, complemento, bairro, cidade, estado, cep, usuario_id],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

const deletar = (endereco_id) => {
  const query = `DELETE FROM endereco WHERE endereco_id = ?`;
  return new Promise((resolve, reject) => {
    db.query(query, [endereco_id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = { 
  cadastrar, 
  listar, 
  buscarPorId, 
  buscarPorUser,
  atualizar, 
  deletar 
};