const produtoModel = require('../models/produtoModel');

const cadastrar = async (req, res) => {
    const {
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
        produto_codigobarras,
        produto_estoque,
        produto_status,
        produto_imagem
    } = req.body;
    
    if (
        !produto_nome ||
        !produto_tipo ||
        !produto_tamanho ||
        !produto_composicao ||
        !produto_marca ||
        !produto_lote ||
        !produto_fabricante ||
        !produto_origem ||
        !produto_instrucoes ||
        !produto_validade ||
        !produto_codigobarras ||
        !produto_estoque ||
        !produto_status ||
        !produto_imagem
    ) {
        return res.status(400).send("Todos os campos são obrigatórios.");
    }

    try {
        await produtoModel.cadastrar(
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
        );
        res.status(201).send("Produto cadastrado com sucesso!");
    } catch (error) {
        res.status(500).send("Erro ao cadastrar produto: " + error.message);
    }
};

module.exports = {
    cadastrar,
};