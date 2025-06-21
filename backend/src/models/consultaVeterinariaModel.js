const db = require('../utils/db');

const cadastrar = (
  servico_id,
  consultaveterinaria_especialidade,
  consultaveterinaria_tipo,
  consultaveterinaria_vacinasaplicadas,
  consultaveterinaria_examesrealizados,
  animal_id
) => {
  const query = `
    INSERT INTO consulta_veterinaria (
      servico_id,
      consultaveterinaria_especialidade,
      consultaveterinaria_tipo,
      consultaveterinaria_vacinasaplicadas,
      consultaveterinaria_examesrealizados,
      animal_id
    ) VALUES (?, ?, ?, ?, ?, ?)`;

  return new Promise((resolve, reject) => {
    db.query(
      query,
      [
        servico_id,
        consultaveterinaria_especialidade,
        consultaveterinaria_tipo,
        consultaveterinaria_vacinasaplicadas,
        consultaveterinaria_examesrealizados,
        animal_id,
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
    db.query('SELECT * FROM consulta_veterinaria', (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const buscarPorId = (consultaveterinaria_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM consulta_veterinaria WHERE consultaveterinaria_id = ?',
      [consultaveterinaria_id],
      (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      }
    );
  });
};

const atualizar = (
  consultaveterinaria_id,
  servico_id,
  consultaveterinaria_especialidade,
  consultaveterinaria_tipo,
  consultaveterinaria_vacinasaplicadas,
  consultaveterinaria_examesrealizados,
  animal_id
) => {
  const query = `
    UPDATE consulta_veterinaria
    SET servico_id = ?, 
        consultaveterinaria_especialidade = ?, 
        consultaveterinaria_tipo = ?, 
        consultaveterinaria_vacinasaplicadas = ?, 
        consultaveterinaria_examesrealizados = ?, 
        animal_id = ?
    WHERE consultaveterinaria_id = ?`;

  return new Promise((resolve, reject) => {
    db.query(
      query,
      [
        servico_id,
        consultaveterinaria_especialidade,
        consultaveterinaria_tipo,
        consultaveterinaria_vacinasaplicadas,
        consultaveterinaria_examesrealizados,
        animal_id,
        consultaveterinaria_id,
      ],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

const deletar = (consultaveterinaria_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      'DELETE FROM consulta_veterinaria WHERE consultaveterinaria_id = ?',
      [consultaveterinaria_id],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

module.exports = {
  cadastrar,
  listarTodos,
  buscarPorId,
  atualizar,
  deletar,
};