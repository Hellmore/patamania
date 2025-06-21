const db = require('../utils/db');

const cadastrar = (produto_id, usuario_id, nota, comentario) => {
    const query = `
        INSERT INTO avaliacao_produto (produto_id, usuario_id, avaliacaoproduto_nota, avaliacaoproduto_comentario)
        VALUES (?, ?, ?, ?)
    `;
    return new Promise((resolve, reject) => {
        db.query(query, [produto_id, usuario_id, nota, comentario], (err, result) => {
            if (err) return reject(err);
            resolve({ avaliacaoproduto_id: result.insertId });
        });
    });
};

const listar = () => {
    const query = 'SELECT * FROM avaliacao_produto';
    return new Promise((resolve, reject) => {
        db.query(query, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

const buscarPorId = (avaliacaoproduto_id) => {
    const query = 'SELECT * FROM avaliacao_produto WHERE avaliacaoproduto_id = ?';
    return new Promise((resolve, reject) => {
        db.query(query, [avaliacaoproduto_id], (err, result) => {
            if (err) return reject(err);
            resolve(result[0]);
        });
    });
};

const atualizar = (avaliacaoproduto_id, nota, comentario) => {
    const query = `
        UPDATE avaliacao_produto
        SET avaliacaoproduto_nota = ?, avaliacaoproduto_comentario = ?
        WHERE avaliacaoproduto_id = ?
    `;
    return new Promise((resolve, reject) => {
        db.query(query, [nota, comentario, avaliacaoproduto_id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

const deletar = (avaliacaoproduto_id) => {
    const query = 'DELETE FROM avaliacao_produto WHERE avaliacaoproduto_id = ?';
    return new Promise((resolve, reject) => {
        db.query(query, [avaliacaoproduto_id], (err, result) => {
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