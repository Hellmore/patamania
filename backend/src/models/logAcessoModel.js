const db = require('../utils/db');

const cadastrar = (
    usuario_id,
    logacesso_ip,
    logacesso_navegador,
    logacesso_sistemaoperacional,
    logacesso_sucesso
) => {
    const query = `
        INSERT INTO log_acesso (
            usuario_id,
            logacesso_ip,
            logacesso_navegador,
            logacesso_sistemaoperacional,
            logacesso_sucesso
        ) VALUES (?, ?, ?, ?, ?)
    `;
    return new Promise((resolve, reject) => {
        db.query(query, [
            usuario_id,
            logacesso_ip,
            logacesso_navegador,
            logacesso_sistemaoperacional,
            logacesso_sucesso
        ], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

const listarTodos = () => {
    const query = `SELECT * FROM log_acesso ORDER BY logacesso_datahora DESC`;
    return new Promise((resolve, reject) => {
        db.query(query, (err, results) => err ? reject(err) : resolve(results));
    });
};

const buscarPorLogacessoId = (logacesso_id) => {
    const query = `SELECT * FROM log_acesso WHERE logacesso_id = ?`;
    return new Promise((resolve, reject) => {
        db.query(query, [logacesso_id], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
    });
};

module.exports = {
    cadastrar,
    listarTodos,
    buscarPorLogacessoId
};