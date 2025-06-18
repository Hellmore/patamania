const db = require('../utils/db');

const cadastrar = (        
    cliente_id,
    animal_id,
    servico_id,
    agendamento_status
) => {
    const query = `
        INSERT INTO agendamento 
        (        
        cliente_id,
        animal_id,
        servico_id,
        agendamento_status
        ) 
        VALUES (?, ?, ?, ?)
    `;
    return new Promise((resolve, reject) => {
        db.query(
            query, 
            [        
                cliente_id,
                animal_id,
                servico_id,
                agendamento_status
            ], 
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    
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
    cliente_id,
    animal_id,
    servico_id,
    agendamento_status
) => {
    const query = `
        UPDATE agendamento SET
        cliente_id = ?,
        animal_id = ?,
        servico_id = ?,
        agendamento_status = ?
        WHERE agendamento_id = ?
    `;
    return new Promise((resolve, reject) => {
        db.query(query, 
            [    
                cliente_id,
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