const db = require('../utils/db');

const cadastrar = (usuario_nome, usuario_email, usuario_senha, usuario_dataNascimento, usuario_tipo, usuario_pais) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO usuario (usuario_nome, usuario_email, usuario_senha, usuario_dataNascimento, usuario_tipo, usuario_pais) VALUES (?, ?, ?, ?, ?, ?)`;
        db.query(query, [usuario_nome, usuario_email, usuario_senha, usuario_dataNascimento, usuario_tipo, usuario_pais], (err, result) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            resolve(result);
        });
    });
};

module.exports = {
    cadastrar,
};