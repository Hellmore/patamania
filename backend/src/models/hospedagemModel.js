const db = require('../utils/db');

const cadastrar = (
  servico_id,
  hospedagem_tipo,
  hospedagem_necessidadesespeciais,
  animal_id
) => {
  const query = `
    INSERT INTO hospedagem (
      servico_id,
      hospedagem_tipo,
      hospedagem_necessidadesespeciais,
      animal_id
    ) VALUES (?, ?, ?, ?)
  `;

  return new Promise((resolve, reject) => {
    db.query(
      query,
      [
        servico_id,
        hospedagem_tipo,
        hospedagem_necessidadesespeciais,
        animal_id
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
    db.query('SELECT * FROM hospedagem', (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const buscarPorId = (hospedagem_id) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM hospedagem WHERE hospedagem_id = ?', [hospedagem_id], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};

const atualizar = (
  hospedagem_id,
  servico_id,
  hospedagem_tipo,
  hospedagem_necessidadesespeciais,
  animal_id
) => {
  const query = `
    UPDATE hospedagem SET
      servico_id = ?,
      hospedagem_tipo = ?,
      hospedagem_necessidadesespeciais = ?,
      animal_id = ?
    WHERE hospedagem_id = ?
  `;

  return new Promise((resolve, reject) => {
    db.query(
      query,
      [
        servico_id,
        hospedagem_tipo,
        hospedagem_necessidadesespeciais,
        animal_id,
        hospedagem_id
      ],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

const deletar = (hospedagem_id) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM hospedagem WHERE hospedagem_id = ?', [hospedagem_id], (err, result) => {
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