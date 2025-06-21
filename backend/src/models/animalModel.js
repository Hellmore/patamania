const db = require('../utils/db');

const cadastrar = (nome, dataNascimento, raca, porte, descricao, pelagem, usuario_id) => {
    const query = `
        INSERT INTO animal 
        (animal_nome, animal_dataNascimento, animal_raca, animal_porte, animal_descricao, animal_pelagem, usuario_id) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    return new Promise((resolve, reject) => {
        db.query(query, [nome, dataNascimento, raca, porte, descricao, pelagem, usuario_id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

const listarTodos = () => {
    const query = `SELECT * FROM animal`;
    return new Promise((resolve, reject) => {
        db.query(query, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

const buscarPorId = (animal_id) => {
    const query = `SELECT * FROM animal WHERE animal_id = ?`;
    return new Promise((resolve, reject) => {
        db.query(query, [animal_id], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
    });
};

const atualizar = (animal_id, nome, dataNascimento, raca, porte, descricao, pelagem) => {
    const query = `
        UPDATE animal SET
        animal_nome = ?,
        animal_dataNascimento = ?,
        animal_raca = ?,
        animal_porte = ?,
        animal_descricao = ?,
        animal_pelagem = ?
        WHERE animal_id = ?
    `;
    return new Promise((resolve, reject) => {
        db.query(query, [nome, dataNascimento, raca, porte, descricao, pelagem, animal_id], (err, result) => {
            if (err) return reject(err);
            resolve(result.affectedRows > 0);
        });
    });
};

const deletar = (animal_id) => {
    const query = `DELETE FROM animal WHERE animal_id = ?`;
    return new Promise((resolve, reject) => {
        db.query(query, [animal_id], (err, result) => {
            if (err) return reject(err);
            resolve(result.affectedRows > 0);
        });
    });
};

const listarPorUsuario = (usuario_id) => {
    const query = `SELECT * FROM animal WHERE usuario_id = ?`;
    return new Promise((resolve, reject) => {
        db.query(query, [usuario_id], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

module.exports = { 
    cadastrar,
    listarTodos,
    buscarPorId,
    atualizar,
    deletar,
    listarPorUsuario
};