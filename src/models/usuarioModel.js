const db = require('../utils/db');

const cadastrar = (usuario) => {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO usuario 
                (usuario_id, usuario_nome, usuario_email, usuario_senha, usuario_dataNascimento, usuario_tipo, usuario_pais, usuario_dataInscricao) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            usuario.usuario_id,
            usuario.usuario_nome,
            usuario.usuario_email,
            usuario.usuario_senha,
            usuario.usuario_dataNascimento,
            usuario.usuario_tipo,
            usuario.usuario_pais,
            usuario.usuario_dataInscricao
        ];

        db.query(query, values, (err, result) => {
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
