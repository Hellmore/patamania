const db = require('../utils/db');

const cadastrar = (agendamento_id, servico_id, animal_id, banhoetosa_tipotosa, banhoetosa_produtosutilizados) => {
    const query = `
        INSERT INTO banho_e_tosa (
            agendamento_id, 
            servico_id, 
            animal_id, 
            banhoetosa_tipotosa, 
            banhoetosa_produtosutilizados
        ) VALUES (?, ?, ?, ?, ?)
    `;

    return new Promise((resolve, reject) => {
        db.query(
            query,
            [agendamento_id, servico_id, animal_id, banhoetosa_tipotosa, banhoetosa_produtosutilizados],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};

const listarTodos = () => {
    const query = `SELECT * FROM banho_e_tosa`;
    return new Promise((resolve, reject) => {
        db.query(query, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

const buscarPorId = (banhoetosa_id) => {
    const query = `SELECT * FROM banho_e_tosa WHERE banhoetosa_id = ?`;
    return new Promise((resolve, reject) => {
        db.query(query, [banhoetosa_id], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
    });
};

const atualizar = (banhoetosa_id, servico_id, banhoetosa_tipotosa, banhoetosa_produtosutilizados, animal_id) => {
    const query = `UPDATE banho_e_tosa 
        SET servico_id = ?, banhoetosa_tipotosa = ?, banhoetosa_produtosutilizados = ?, animal_id = ? 
        WHERE banhoetosa_id = ?`;

    return new Promise((resolve, reject) => {
        db.query(query, [servico_id, banhoetosa_tipotosa, banhoetosa_produtosutilizados, animal_id, banhoetosa_id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

const deletar = (banhoetosa_id) => {
    const query = `DELETE FROM banho_e_tosa WHERE banhoetosa_id = ?`;

    return new Promise((resolve, reject) => {
        db.query(query, [banhoetosa_id], (err, result) => {
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