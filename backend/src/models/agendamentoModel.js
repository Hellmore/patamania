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
    const query = `SELECT a.*,
            tutor.usuario_nome as nome_tutor,
            service.servico_nome as nome_servico,
            pet.animal_nome as nome_pet,
            a.agendamento_datahora
            FROM agendamento a
            LEFT JOIN usuario tutor ON a.usuario_id  = tutor.usuario_id
            LEFT JOIN servico service ON a.servico_id = service.servico_id
            LEFT JOIN animal pet ON a.animal_id = pet.animal_id`
    return new Promise((resolve, reject) => {
        db.query(query, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

const buscarPorId = (agendamento_id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT a.*,
            tutor.usuario_nome as nome_tutor,
            service.servico_nome as nome_servico,
            pet.animal_nome as nome_pet
            FROM agendamento a
            LEFT JOIN usuario tutor ON a.usuario_id  = tutor.usuario_id
            LEFT JOIN servico service ON a.servico_id = service.servico_id
            LEFT JOIN animal pet ON a.animal_id = pet.animal_id
            WHERE a.agendamento_id = ?`, 
            [agendamento_id], 
            (err, results) => {
                if (err) return reject(err);
                resolve(results); // Retornando todos os resultados
        });
    });
};

const buscarPorUser = (usuario_id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT a.*,
            tutor.usuario_nome as nome_tutor,
            service.servico_nome as nome_servico,
            pet.animal_nome as nome_pet
            FROM agendamento a
            LEFT JOIN usuario tutor ON a.usuario_id  = tutor.usuario_id
            LEFT JOIN servico service ON a.servico_id = service.servico_id
            LEFT JOIN animal pet ON a.animal_id = pet.animal_id
            WHERE a.usuario_id = ?`, 
            [usuario_id], 
            (err, results) => {
                if (err) return reject(err);
                resolve(results); // Retornando todos os resultados
        });
    });
};

const cancelar = (agendamento_id) => {
    const query = `UPDATE agendamento SET agendamento_status = 'CANCELADO' WHERE agendamento_id = ?`;
    return new Promise((resolve, reject) => {
        db.query(query, [agendamento_id], (err, result) => {
            if (err) return reject(err);
            resolve(result.affectedRows > 0);
        });
    });
};

const atualizar = (id, dados) => {        
  return new Promise((resolve, reject) => {
    const campos = [];
    const valores = [];
    
    for (const [key, value] of Object.entries(dados)) {
      if (value !== undefined && value !== null) {
        campos.push(`${key} = ?`);
        valores.push(value);
      }
    }
    
    if (campos.length === 0) {
      return reject(new Error('Nenhum campo para atualizar'));
    }
    
    valores.push(id);
    
    const query = `UPDATE agendamento SET ${campos.join(', ')} WHERE usuario_id = ?`;
    console.log('Query SQL:', query); // Log para debug
    console.log('Valores:', valores); // Log para debug
    
    db.query(query, valores, (err, result) => {
      if (err) {
        console.error('Erro na query:', err);
        return reject(err);
      }
      console.log('Resultado da atualização:', result);
      resolve(result);
    });
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
    buscarPorUser,
    cancelar,
    atualizar,
    deletar
};