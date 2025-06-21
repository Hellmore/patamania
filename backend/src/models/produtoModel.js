const db = require('../utils/db');

const cadastrar = (
    produto_nome,
    produto_tipo,
    produto_tamanho,
    produto_composicao,
    produto_marca,
    produto_lote,
    produto_fabricante,
    produto_origem,
    produto_instrucoes,
    produto_validade,
    produto_imagem,
    produto_codigobarras,
    produto_estoque,
    produto_status,
    produto_preco,
    produto_garantia
) => {
    const query = `
        INSERT INTO produto 
        (
            produto_nome, 
            produto_tipo, 
            produto_tamanho, 
            produto_composicao, 
            produto_marca, 
            produto_lote, 
            produto_fabricante, 
            produto_origem, 
            produto_instrucoes, 
            produto_validade, 
            produto_imagem, 
            produto_codigobarras, 
            produto_estoque, 
            produto_status,
            produto_preco,
            produto_garantia
        ) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    return new Promise((resolve, reject) => {
        db.query(
            query,
            [
                produto_nome,
                produto_tipo,
                produto_tamanho,
                produto_composicao,
                produto_marca,
                produto_lote,
                produto_fabricante,
                produto_origem,
                produto_instrucoes,
                produto_validade,
                produto_imagem,
                produto_codigobarras,
                produto_estoque,
                produto_status,
                produto_preco,
                produto_garantia
            ],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};

const listarTodos = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM produto', (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

const buscarPorId = (produto_id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM produto WHERE produto_id = ?', [produto_id], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]); 
        });
    });
};

const atualizar = (
    produto_id,
    produto_nome,
    produto_tipo,
    produto_tamanho,
    produto_composicao,
    produto_marca,
    produto_lote,
    produto_fabricante,
    produto_origem,
    produto_instrucoes,
    produto_validade,
    produto_imagem,
    produto_codigobarras,
    produto_estoque,
    produto_status,
    produto_garantia,
    produto_preco
) => {
    const query = `
        UPDATE produto SET
            produto_nome = ?,
            produto_tipo = ?,
            produto_tamanho = ?,
            produto_composicao = ?,
            produto_marca = ?,
            produto_lote = ?,
            produto_fabricante = ?,
            produto_origem = ?,
            produto_instrucoes = ?,
            produto_validade = ?,
            produto_imagem = ?,
            produto_codigobarras = ?,
            produto_estoque = ?,
            produto_status = ?,
            produto_garantia = ?,
            produto_preco = ?
        WHERE produto_id = ?
    `;

    return new Promise((resolve, reject) => {
        db.query(
            query,
            [
                produto_nome,
                produto_tipo,
                produto_tamanho,
                produto_composicao,
                produto_marca,
                produto_lote,
                produto_fabricante,
                produto_origem,
                produto_instrucoes,
                produto_validade,
                produto_imagem,
                produto_codigobarras,
                produto_estoque,
                produto_status,
                produto_garantia,
                produto_preco,
                produto_id
            ],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};

const deletar = (produto_id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM produto WHERE produto_id = ?', [produto_id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

module.exports = {
    cadastrar,
    listarTodos,
    buscarPorId,
    atualizar,
    deletar
};