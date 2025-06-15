const db = require('../utils/db');

const listarTodos = () => {
    const query = `SELECT * FROM compra ORDER BY compra_data DESC`;
    return new Promise((resolve, reject) => {
        db.query(query, (err, results) => err ? reject(err) : resolve(results));
    });
};

const buscarPorId = (compra_id) => {
    const query = `SELECT * FROM compra WHERE compra_id = ?`;
    return new Promise((resolve, reject) => {
        db.query(query, [compra_id], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
    });
};

const buscarPorUsuario = (usuario_id) => {
    const query = `
        SELECT * FROM compra 
        WHERE usuario_id = ? 
        ORDER BY compra_data DESC
    `;
    return new Promise((resolve, reject) => {
        db.query(query, [usuario_id], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

const deletar = (compra_id) => {
    const query = `DELETE FROM compra WHERE compra_id = ?`;
    return new Promise((resolve, reject) => {
        db.query(query, [compra_id], (err, result) => {
            if (err) return reject(err);
            resolve(result.affectedRows > 0);
        });
    });
};

module.exports = {
    listarTodos,
    buscarPorId,
    buscarPorUsuario,
    deletar
};
