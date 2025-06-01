const db = require('../utils/db');

const cadastrar = (usuario) => {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO usuario 
                (usuario_nome, usuario_email, usuario_senha, usuario_dataNascimento, usuario_tipo, usuario_pais, usuario_dataInscricao) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
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

const listarTodos = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM usuario', (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

const buscarPorId = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM usuario WHERE usuario_id = ?', [id], (err, result) => {
            if (err) return reject(err);
            resolve(result[0]);
        });
    });
};

const buscarPorEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM usuario WHERE usuario_email = ?', [email], (err, result) => {
            if (err) return reject(err);
            resolve(result[0]);
        });
    });
};

const atualizar = (id, usuario) => {
    return new Promise((resolve, reject) => {
        const query = `
            UPDATE usuario SET 
                usuario_nome = ?, 
                usuario_email = ?, 
                usuario_senha = ?, 
                usuario_dataNascimento = ?, 
                usuario_tipo = ?, 
                usuario_pais = ?
            WHERE usuario_id = ?
        `;
        const values = [
            usuario.usuario_nome,
            usuario.usuario_email,
            usuario.usuario_senha,
            usuario.usuario_dataNascimento,
            usuario.usuario_tipo,
            usuario.usuario_pais,
            id
        ];
        db.query(query, values, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

const excluir = (id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM usuario WHERE usuario_id = ?', [id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

module.exports = {
    cadastrar,
    listarTodos,
    buscarPorId,
    buscarPorEmail,
    atualizar,
    excluir
};