const db = require('../utils/db');

const cadastrar = (usuario_id, animal_id, servico_id, agendamento_status, agendamento_datahora) => {
  const query = `
    INSERT INTO agendamento 
    (usuario_id, animal_id, servico_id, agendamento_status, agendamento_datahora) 
    VALUES (?, ?, ?, ?, ?)
  `;
  return new Promise((resolve, reject) => {
    db.query(query, [usuario_id, animal_id, servico_id, agendamento_status, agendamento_datahora], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const listarTodos = () => {
    const query = `SELECT * FROM agendamento`;
    return new Promise((resolve, reject) => {
        db.query(query, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

const buscarPorId = (agendamento_id) => {
    const query = `SELECT * FROM agendamento WHERE agendamento_id = ?`;
    return new Promise((resolve, reject) => {
        db.query(query, [agendamento_id], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
    });
};

const atualizar = (        
    agendamento_id,
    usuario_id,
    animal_id,
    servico_id,
    agendamento_status
) => {
    const query = `
        UPDATE agendamento SET
        usuario_id = ?,
        animal_id = ?,
        servico_id = ?,
        agendamento_status = ?
        WHERE agendamento_id = ?
    `;
    return new Promise((resolve, reject) => {
        db.query(query, 
            [    
                usuario_id,
                animal_id,
                servico_id,
                agendamento_status,
                agendamento_id
            ], 
            (err, result) => {
                if (err) return reject(err);
                resolve(result.affectedRows > 0);
            }
        );
    });
};


const deletar = (agendamento_id) => {
    const query = `DELETE FROM agendamento WHERE agendamento_id = ?`;
    return new Promise((resolve, reject) => {
        db.query(query, [agendamento_id], (err, result) => {
            if (err) return reject(err);
            resolve(result.affectedRows > 0);
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