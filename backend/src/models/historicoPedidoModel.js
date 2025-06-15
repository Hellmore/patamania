const db = require('../utils/db');

const cadastrar = (historicopedido_id, compra_id, historicopedido_status, historicopedido_datahora, historicopedido_observacao) => {
    const query = `
        INSERT INTO historico_pedido (historicopedido_id, compra_id, historicopedido_status, historicopedido_datahora, historicopedido_observacao)
        VALUES (?, ?, ?, ?, ?)
    `;
    return new Promise((resolve, reject) => {
        db.query(query, [historicopedido_id, compra_id, historicopedido_status, historicopedido_datahora, historicopedido_observacao], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

const listarTodos = () => {
    const query = `SELECT * FROM historico_pedido ORDER BY historico_data DESC`;
    return new Promise((resolve, reject) => {
        db.query(query, (err, results) => err ? reject(err) : resolve(results));
    });
};

module.exports = {
    cadastrar,
    listarTodos
};
