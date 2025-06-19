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

const listarComResponsaveisECriador  = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        s.*, 
        responsavel.usuario_nome as profissional_nome,
        criador.usuario_nome as criador_nome,
        criador.usuario_email as criador_email
      FROM servico s
      LEFT JOIN usuario responsavel ON s.servico_profissionalresponsavel = responsavel.usuario_id
      LEFT JOIN usuario criador ON s.servico_responsavelagendamento = criador.usuario_id
    `;

    
    db.query(query, (err, results) => {
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
  listarComResponsaveisECriador,
  buscarPorId,
  atualizar,
  deletar
};