const carrinhoModel = require('../models/carrinhoModel');

const cadastrar = async (req, res) => {
    const { carrinho_id, usuario_id, carrinho_data_criacao } = req.body;
    if (!carrinho_id || !usuario_id || !carrinho_data_criacao) {
        return res.status(400).send("Todos os campos de carrinho são obrigatórios!");
    }
    try {
        await carrinhoModel.cadastrar(carrinho_id, usuario_id, carrinho_data_criacao);
        res.status(201).send("Carrinho criado com sucesso");
    } catch (err) {
        res.status(500).send("Erro ao criar carrinho: " + err.message);
    }
};

const listarTodos = async (req, res) => {
    try {
        const carrinhos = await carrinhoModel.listarTodos();
        res.json(carrinhos);
    } catch (err) {
        res.status(500).send("Erro ao listar carrinhos: " + err.message);
    }
};

const buscarPorId = async (req, res) => {
    const { carrinho_id } = req.params;
    try {
        const carrinho = await carrinhoModel.buscarPorId(carrinho_id);
        if (!carrinho) return res.status(404).send("Carrinho não encontrado");
        res.json(carrinho);
    } catch (err) {
        res.status(500).send("Erro ao buscar carrinho: " + err.message);
    }
};

const atualizar = async (req, res) => {
    const { carrinho_id } = req.params;
    const { usuario_id, carrinho_data_criacao } = req.body;
    if ( !usuario_id || !carrinho_data_criacao) {
        return res.status(400).send("Todos os campos são obrigatórios!");
    }
    try {
        const existe = await carrinhoModel.buscarPorId(carrinho_id);
        if (!existe) return res.status(404).send("Carrinho não encontrado");
        await carrinhoModel.atualizar(carrinho_id, usuario_id, carrinho_data_criacao);
        res.send("Carrinho atualizado com sucesso");
    } catch (err) {
        res.status(500).send("Erro ao atualizar carrinho: " + err.message);
    }
};

const deletar = async (req, res) => {
    const { carrinho_id } = req.params;
    try {
        const existe = await carrinhoModel.buscarPorId(carrinho_id);
        if (!existe) return res.status(404).send("Carrinho não encontrado");
        await carrinhoModel.deletar(carrinho_id);
        res.send("Carrinho deletado com sucesso");
    } catch (err) {
        res.status(500).send("Erro ao deletar carrinho: " + err.message);
    }
};

module.exports = {
    cadastrar,
    listarTodos,
    buscarPorId,
    atualizar,
    deletar
};
