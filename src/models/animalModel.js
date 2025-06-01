const db = require('../utils/db');

const cadastrar = (nome, dataNascimento, raca, porte, descricao, pelagem) => {
    const query = `
        INSERT INTO animal 
        (animal_nome, animal_dataNascimento, animal_raca, animal_porte, animal_descricao, animal_pelagem) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    return new Promise((resolve, reject) => {
        db.query(query, [nome, dataNascimento, raca, porte, descricao, pelagem], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

module.exports = { cadastrar };
