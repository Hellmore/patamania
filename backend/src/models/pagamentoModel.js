const db = require('../utils/db');

const cadastrar = (
    pagamento_forma,
    pagamento_status,
    usuario_id,
    pagamento_valor_final,
    endereco_id,
    nome_usuario,
    codigo_seguranca,
    cupom // pode ser null
) => {
    const query = `CALL sp_inserir_pagamento_com_compra(?, ?, ?, ?, ?, ?, ?, ?)`;

    return new Promise((resolve, reject) => {
        db.query(query, [
            pagamento_forma,
            pagamento_status,
            pagamento_valor_final,
            usuario_id,
            nome_usuario,
            endereco_id,
            codigo_seguranca,
            cupom
        ], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};


const listarTodos = () => {
    const query = `SELECT * FROM pagamento`;
    return new Promise((resolve, reject) => {
        db.query(query, (err, results) => err ? reject(err) : resolve(results));
    });
};

const buscarPorId = (pagamento_id) => {
    const query = `SELECT * FROM pagamento WHERE pagamento_id = ?`;
    return new Promise((resolve, reject) => {
        db.query(query, [pagamento_id], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
    });
};

const atualizar = (
    pagamento_forma,
    pagamento_status,
    usuario_id,
    pagamento_valor_final,
    endereco_id,
    pagamento_id
) => {
    const query = `
        UPDATE pagamento SET
            pagamento_forma = ?,
            pagamento_status = ?,
            usuario_id = ?,
            pagamento_valor_final = ?,
            endereco_id = ?
        WHERE pagamento_id = ?
    `;
    return new Promise((resolve, reject) => {
        db.query(query, [
            pagamento_forma,
            pagamento_status,
            usuario_id,
            pagamento_valor_final,
            endereco_id,
            pagamento_id  // importante passar aqui para o WHERE!
        ], (err, result) => {
            if (err) return reject(err);
            resolve(result.affectedRows > 0);
        });
    });
};


const deletar = (pagamento_id) => {
    const query = `DELETE FROM pagamento WHERE pagamento_id = ?`;
    return new Promise((resolve, reject) => {
        db.query(query, [pagamento_id], (err, result) => {
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
