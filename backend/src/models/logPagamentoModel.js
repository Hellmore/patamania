const db = require('../utils/db');

const cadastrar = (logpagamento_id, pagamento_id, logpagamento_acao, logpagamento_datahora, logpagamento_descricao) => {
    const query = `
        INSERT INTO log_pagamento (logpagamento_id, pagamento_id, logpagamento_acao, logpagamento_datahora, logpagamento_descricao)
        VALUES (?, ?, ?, ?, ?)
    `;
    return new Promise((resolve, reject) => {
        db.query(query, [logpagamento_id, pagamento_id, logpagamento_acao, logpagamento_datahora, logpagamento_descricao], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

const listarTodos = () => {
    const query = `SELECT * FROM log_pagamento ORDER BY log_data DESC`;
    return new Promise((resolve, reject) => {
        db.query(query, (err, results) => err ? reject(err) : resolve(results));
    });
};

module.exports = {
    cadastrar,
    listarTodos
};
