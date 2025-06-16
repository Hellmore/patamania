const db = require('../utils/db');

const cadastrar = (
    animal_id,
    agendamento_id,
    historicoanimal_descricao,
    historicoanimal_vacinas,
    historicoanimal_medicamentos
) => {
    const query = `
        INSERT INTO historico_animal (
            animal_id,
            agendamento_id,
            historicoanimal_descricao,
            historicoanimal_vacinas,
            historicoanimal_medicamentos
        ) VALUES (?, ?, ?, ?, ?)
    `;
    return new Promise((resolve, reject) => {
        db.query(query, [
            animal_id,
            agendamento_id,
            historicoanimal_descricao,
            historicoanimal_vacinas,
            historicoanimal_medicamentos
        ], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

const listarTodos = () => {
    const query = `SELECT * FROM historico_animal ORDER BY historicoanimal_datahora DESC`;
    return new Promise((resolve, reject) => {
        db.query(query, (err, results) => err ? reject(err) : resolve(results));
    });
};

const buscarPorId = (historicoanimal_id) => {
    const query = `SELECT * FROM historico_animal WHERE historicoanimal_id = ?`;
    return new Promise((resolve, reject) => {
        db.query(query, [historicoanimal_id], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]); 
        });
    });
};

module.exports = {
    cadastrar,
    listarTodos,
    buscarPorId
};