const avaliacaoProdutoModel = require('../models/avaliacaoProdutoModel');

const cadastrar = async (req, res) => {
    const { produto_id, usuario_id, avaliacaoproduto_nota, avaliacaoproduto_comentario } = req.body;

    if (!produto_id || !usuario_id || !avaliacaoproduto_nota) {
        return res.status(400).send("Preencha todos os campos obrigatórios.");
    }

    try {
        await avaliacaoProdutoModel.cadastrar(produto_id, usuario_id, avaliacaoproduto_nota, avaliacaoproduto_comentario);
        res.status(201).send("Avaliação cadastrada com sucesso!");
    } catch (error) {
        res.status(500).send("Erro ao cadastrar avaliação: " + error.message);
    }
};

const listar = async (req, res) => {
    try {
        const result = await avaliacaoProdutoModel.listar();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send("Erro ao listar avaliações: " + error.message);
    }
};

const buscarPorId = async (req, res) => {
    const { avaliacaoproduto_id } = req.params;
    try {
        const result = await avaliacaoProdutoModel.buscarPorId(avaliacaoproduto_id);
        if (!result) {
            return res.status(404).send("Avaliação não encontrada.");
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send("Erro ao buscar avaliação: " + error.message);
    }
};

const atualizar = async (req, res) => {
    const { avaliacaoproduto_id } = req.params;
    const { avaliacaoproduto_nota, avaliacaoproduto_comentario } = req.body;

    if (!avaliacaoproduto_nota) {
        return res.status(400).send("Nota é obrigatória.");
    }

    try {
        await avaliacaoProdutoModel.atualizar(avaliacaoproduto_id, avaliacaoproduto_nota, avaliacaoproduto_comentario);
        res.status(200).send("Avaliação atualizada com sucesso!");
    } catch (error) {
        res.status(500).send("Erro ao atualizar avaliação: " + error.message);
    }
};

const deletar = async (req, res) => {
    const { avaliacaoproduto_id } = req.params;
    try {
        await avaliacaoProdutoModel.deletar(avaliacaoproduto_id);
        res.status(200).send("Avaliação deletada com sucesso!");
    } catch (error) {
        res.status(500).send("Erro ao deletar avaliação: " + error.message);
    }
};

module.exports = { 
    cadastrar, 
    listar, 
    buscarPorId, 
    atualizar, 
    deletar 
};