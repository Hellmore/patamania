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
    produto_status
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
            produto_status
        ) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
                produto_status
            ],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};

module.exports = { cadastrar };