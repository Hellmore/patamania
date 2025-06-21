const db = require('../utils/db');

const cadastrar = async (
  servico_id,
  passeio_tipo,
  passeio_nivelatividade,
  animal_id,
  agendamento_id
) => {
  return db.promise().query(
    `INSERT INTO passeio (
      servico_id,
      passeio_tipo,
      passeio_nivelatividade,
      animal_id,
      agendamento_id
    ) VALUES (?, ?, ?, ?, ?)`,
    [servico_id, passeio_tipo, passeio_nivelatividade, animal_id, agendamento_id]
  );
};

const listarTodos = async () => {
  return db.promise().query(`SELECT * FROM passeio`);
};

const buscarPorId = async (passeio_id) => {
  return db.promise().query(`SELECT * FROM passeio WHERE passeio_id = ?`, [passeio_id]);
};

const atualizar = async (
  passeio_id,
  servico_id,
  passeio_duracao,
  passeio_tipo,
  passeio_nivelatividade,
  animal_id,
  agendamento_id
) => {
  return db.promise().query(
    `UPDATE passeio SET
      servico_id = ?,
      passeio_duracao = ?,
      passeio_tipo = ?,
      passeio_nivelatividade = ?,
      animal_id = ?,
      agendamento_id = ?,
    WHERE passeio_id = ?`,
    [servico_id, passeio_duracao, passeio_tipo, passeio_nivelatividade, animal_id, agendamento_id, passeio_id]
  );
};

const deletar = async (passeio_id) => {
  return db.promise().query(`DELETE FROM passeio WHERE passeio_id = ?`, [passeio_id]);
};

module.exports = {
  cadastrar,
  listarTodos,
  buscarPorId,
  atualizar,
  deletar
};