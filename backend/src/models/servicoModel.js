const db = require('../utils/db');

const cadastrar = (
  servico_nome,
  servico_descricao,
  servico_categoria,
  servico_preco,
  servico_disponibilidade,
  servico_localizacao,
  servico_profissionalresponsavel,
  servico_responsavelagendamento,
  servico_duracao,
  servico_taxa
) => {
  const query = `
    INSERT INTO servico (
      servico_nome,
      servico_descricao,
      servico_categoria,
      servico_preco,
      servico_disponibilidade,
      servico_localizacao,
      servico_profissionalresponsavel,
      servico_responsavelagendamento,
      servico_duracao,
      servico_taxa
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  return new Promise((resolve, reject) => {
    db.query(
      query,
      [
        servico_nome,
        servico_descricao,
        servico_categoria,
        servico_preco,
        servico_disponibilidade,
        servico_localizacao,
        servico_profissionalresponsavel,
        servico_responsavelagendamento,
        servico_duracao,
        servico_taxa
      ],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

const listarTodos = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM servico', (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const buscarPorId = (servico_id) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM servico WHERE servico_id = ?', [servico_id], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};

const atualizar = (
  servico_id,
  servico_nome,
  servico_descricao,
  servico_categoria,
  servico_preco,
  servico_disponibilidade,
  servico_localizacao,
  servico_profissionalresponsavel,
  servico_responsavelagendamento,
  servico_duracao,
  servico_taxa
) => {
  const query = `
    UPDATE servico SET
      servico_nome = ?,
      servico_descricao = ?,
      servico_categoria = ?,
      servico_preco = ?,
      servico_disponibilidade = ?,
      servico_localizacao = ?,
      servico_profissionalresponsavel = ?,
      servico_responsavelagendamento = ?,
      servico_duracao = ?,
      servico_taxa = ?
    WHERE servico_id = ?
  `;

  return new Promise((resolve, reject) => {
    db.query(
      query,
      [
        servico_nome,
        servico_descricao,
        servico_categoria,
        servico_preco,
        servico_disponibilidade,
        servico_localizacao,
        servico_profissionalresponsavel,
        servico_responsavelagendamento,
        servico_duracao,
        servico_taxa,
        servico_id
      ],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

const deletar = (servico_id) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM servico WHERE servico_id = ?', [servico_id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  cadastrar,
  listarTodos,
  buscarPorId,
  atualizar,
  deletar
};