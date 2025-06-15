const db = require('../utils/db');

const cadastrar = (compra_id, item_id) => {
    const query = `INSERT INTO compra_item_selecionado (compra_id, item_id) VALUES (?, ?)`;
    return new Promise((resolve, reject) => {
        db.query(query, [compra_id, item_id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

const listarTodos = () => {
    const query = `SELECT * FROM compra_item_selecionado`;
    return new Promise((resolve, reject) => {
        db.query(query, (err, results) => err ? reject(err) : resolve(results));
    });
};

const deletar = (compra_id, item_id) => {
    const query = `DELETE FROM compra_item_selecionado WHERE compra_id = ? AND item_id = ?`;
    return new Promise((resolve, reject) => {
        db.query(query, [compra_id, item_id], (err, result) => {
            if (err) return reject(err);
            resolve(result.affectedRows > 0);
        });
    });
};

module.exports = {
    cadastrar,
    listarTodos,
    deletar
};
