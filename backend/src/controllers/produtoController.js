const produtoModel = require('../models/produtoModel');

function verificarTipo(produto, res) {
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
        produto_garantia,
        produto_preco
    } = produto;

    if (produto_tipo === 'NAO PERECIVEL' && 
        (
            !produto_nome ||
            !produto_tipo ||
            !produto_tamanho ||
            !produto_composicao ||
            !produto_marca ||
            !produto_lote ||
            !produto_fabricante ||
            !produto_origem ||
            !produto_instrucoes ||
            !produto_codigobarras ||
            produto_estoque === undefined || // Pode ser zero, então cheque !== undefined
            !produto_garantia ||
            !produto_preco
        )
    ) {
        return res.status(400).send("Preencha os campos obrigatórios!");
    } 
    
    if (produto_tipo === 'PERECIVEL' && 
        (
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
            produto_estoque === undefined || // Pode ser zero, então cheque !== undefined
            !produto_preco
        ) 
    ) {
        return res.status(400).send("Preencha os campos obrigatórios!");
    } 

    return true; // Retorna verdadeiro se a validação passar
}

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
        produto_imagem,
        produto_garantia,
        produto_preco
    } = req.body;

    // Verifica se a validação dos campos obrigatórios passou
    const validacao = verificarTipo(req.body, res);
    if (validacao !== true) {
        return; // Se a validação falhar, não continua
    }

    let produto_status;
    if (produto_estoque > 0) {
        produto_status = 'DISPONIVEL';
    } else {
        produto_status = 'ESGOTADO';
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
            produto_status,
            produto_preco,
            produto_garantia
        );
        res.status(201).send("Produto cadastrado com sucesso!");
    } catch (error) {
        res.status(500).send("Erro ao cadastrar produto: " + error.message);
    }
};

const listarTodos = async (req, res) => {
    try {
        const produtos = await produtoModel.listarTodos();

        produtos.forEach(produto => {
            if (produto.produto_imagem) {
                produto.produto_imagem = `data:image/png;base64,${produto.produto_imagem}`;
            }
        });

        res.json(produtos);
    } catch (error) {
        res.status(500).send("Erro ao listar produtos: " + error.message);
    }
};

const buscarPorId = async (req, res) => {
    const { produto_id } = req.params;

    try {
        const produto = await produtoModel.buscarPorId(produto_id);
        if (!produto) {
            return res.status(404).send("Produto não encontrado.");
        }
        res.json(produto);
    } catch (error) {
            return res.status(404).send("Produto não encontrado.");
    }
};

const atualizar = async (req, res) => {
    const { produto_id } = req.params;
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
        produto_estoque === undefined ||
        !produto_status ||
        !produto_imagem
    ) {
        return res.status(400).send("Todos os campos são obrigatórios para atualizar.");
    }

    try {
        const produtoExistente = await produtoModel.buscarPorId(produto_id);
        if (!produtoExistente) {
            return res.status(404).send("Produto não encontrado.");
        }

        await produtoModel.atualizar(
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
            produto_status
        );
        res.send("Produto atualizado com sucesso!");
    } catch (error) {
        res.status(500).send("Erro ao atualizar produto: " + error.message);
    }
};

const deletar = async (req, res) => {
    const { produto_id } = req.params;

    try {
        const produtoExistente = await produtoModel.buscarPorId(produto_id);
        if (!produtoExistente) {
            return res.status(404).send("Produto não encontrado.");
        }

        await produtoModel.deletar(produto_id);
        res.send("Produto deletado com sucesso!");
    } catch (error) {
        res.status(500).send("Erro ao deletar produto: " + error.message);
    }
};

module.exports = {
    cadastrar,
    listarTodos,
    buscarPorId,
    atualizar,
    deletar
};