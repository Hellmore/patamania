const db = require('../utils/db');

const cadastrar = (carrinho_id, usuario_id, carrinho_data_criacao) => {
    const query = `INSERT INTO carrinho (carrinho_id, usuario_id, carrinho_data_criacao) VALUES (?, ?, ?)`;
    return new Promise((resolve, reject) => {
        db.query(query, [carrinho_id, usuario_id, carrinho_data_criacao], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

const listarTodos = () => {
    const query = `SELECT * FROM carrinho`;
    return new Promise((resolve, reject) => {
        db.query(query, (err, results) => err ? reject(err) : resolve(results));
    });
};

const buscarPorId = (carrinho_id) => {
    const query = `SELECT * FROM carrinho WHERE carrinho_id = ?`;
    return new Promise((resolve, reject) => {
        db.query(query, [carrinho_id], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
    });
};

const atualizar = (carrinho_id, usuario_id, carrinho_data_criacao) => {
    const query = `
        UPDATE carrinho SET usuario_id = ?, carrinho_data_criacao = ?
        WHERE carrinho_id = ?
    `;
    return new Promise((resolve, reject) => {
        db.query(query, [usuario_id, carrinho_data_criacao, carrinho_id], (err, result) => {
            if (err) return reject(err);
            resolve(result.affectedRows > 0);
        });
    });
};

const deletar = (carrinho_id) => {
    const query = `DELETE FROM carrinho WHERE carrinho_id = ?`;
    return new Promise((resolve, reject) => {
        db.query(query, [carrinho_id], (err, result) => {
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
