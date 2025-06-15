const db = require('../utils/db');

const cadastrar = (
            carrinho_id,
            produto_id,
            item_quantidade,
            item_preco_unitario ) => {
    const query = `
        INSERT INTO item_carrinho (
            carrinho_id,
            produto_id,
            item_quantidade,
            item_preco_unitario )
        VALUES (?, ?, ?, ?)
    `;
    return new Promise((resolve, reject) => {
        db.query(query, [
            carrinho_id,
            produto_id,
            item_quantidade,
            item_preco_unitario 
            ], 
            (err, result) => {
            if (err) return reject(err);
            resolve(result);
            }
        );
    });
};

const listarTodos = () => {
    const query = `SELECT * FROM item_carrinho`;
    return new Promise((resolve, reject) => {
        db.query(query, (err, results) => err ? reject(err) : resolve(results));
    });
};

const buscarPorId = (item_id) => {
    const query = `SELECT * FROM item_carrinho WHERE item_id = ?`;
    return new Promise((resolve, reject) => {
        db.query(query, [item_id], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
    });
};

const atualizar = (            
            item_id,
            carrinho_id,
            produto_id,
            item_quantidade,
            item_preco_unitario ) => {
    const query = `
        UPDATE item_carrinho SET
            carrinho_id = ?,
            produto_id = ?,
            item_quantidade = ?,
            item_preco_unitario = ?
        WHERE item_id = ?
    `;
    return new Promise((resolve, reject) => {
        db.query(query, [carrinho_id, produto_id, item_quantidade, item_preco_unitario, item_id], (err, result) => {
            if (err) return reject(err);
            resolve(result.affectedRows > 0);
        });
    });
};

const deletar = (item_id) => {
    const query = `DELETE FROM item_carrinho WHERE item_id = ?`;
    return new Promise((resolve, reject) => {
        db.query(query, [item_id], (err, result) => {
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
