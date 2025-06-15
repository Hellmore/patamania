const db = require('../utils/db');

const cadastrar = (servico_id, usuario_id, nota, comentario) => {
    const query = `
        INSERT INTO avaliacao_servico (servico_id, usuario_id, avaliacaoservico_nota, avaliacaoservico_comentario)
        VALUES (?, ?, ?, ?)
    `;
    return new Promise((resolve, reject) => {
        db.query(query, [servico_id, usuario_id, nota, comentario], (err, result) => {
            if (err) return reject(err);
            resolve({ avaliacaoservico_id: result.insertId });
        });
    });
};

const listar = () => {
    const query = 'SELECT * FROM avaliacao_servico';
    return new Promise((resolve, reject) => {
        db.query(query, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

const buscarPorId = (avaliacaoservico_id) => {
    const query = 'SELECT * FROM avaliacao_servico WHERE avaliacaoservico_id = ?';
    return new Promise((resolve, reject) => {
        db.query(query, [avaliacaoservico_id], (err, result) => {
            if (err) return reject(err);
            resolve(result[0]);
        });
    });
};

const atualizar = (avaliacaoservico_id, nota, comentario) => {
    const query = `
        UPDATE avaliacao_servico
        SET avaliacaoservico_nota = ?, avaliacaoservico_comentario = ?
        WHERE avaliacaoservico_id = ?
    `;
    return new Promise((resolve, reject) => {
        db.query(query, [nota, comentario, avaliacaoservico_id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

const deletar = (avaliacaoservico_id) => {
    const query = 'DELETE FROM avaliacao_servico WHERE avaliacaoservico_id = ?';
    return new Promise((resolve, reject) => {
        db.query(query, [avaliacaoservico_id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

module.exports = { 
    cadastrar, 
    listar, 
    buscarPorId, 
    atualizar, 
    deletar 
};