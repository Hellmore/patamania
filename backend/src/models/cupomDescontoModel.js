const db = require('../utils/db');

const cadastrar = (cupomdesconto_codigo, cupomdesconto_descricao, cupomdesconto_descontopercentual, cupomdesconto_validade) => {
    const query = `
        INSERT INTO cupom_desconto 
        (cupomdesconto_codigo, cupomdesconto_descricao, cupomdesconto_descontopercentual, cupomdesconto_validade) 
        VALUES (?, ?, ?, ?)
    `;
    return new Promise((resolve, reject) => {
        db.query(query, [cupomdesconto_codigo, cupomdesconto_descricao, cupomdesconto_descontopercentual, cupomdesconto_validade], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

const listarTodos = () => {
    const query = `SELECT * FROM cupomdesconto ORDER BY cupom_valido_ate DESC`;
    return new Promise((resolve, reject) => {
        db.query(query, (err, results) => err ? reject(err) : resolve(results));
    });
};

const buscarPorCodigo = (cupom_codigo) => {
    const query = `SELECT * FROM cupomdesconto WHERE cupom_codigo = ?`;
    return new Promise((resolve, reject) => {
        db.query(query, [cupom_codigo], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
    });
};

const deletar = (cupom_codigo) => {
    const query = `DELETE FROM cupomdesconto WHERE cupom_codigo = ?`;
    return new Promise((resolve, reject) => {
        db.query(query, [cupom_codigo], (err, result) => {
            if (err) return reject(err);
            resolve(result.affectedRows > 0);
        });
    });
};

module.exports = {
    cadastrar,
    listarTodos,
    buscarPorCodigo,
    deletar
};
