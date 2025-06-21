const avaliacaoServicoModel = require('../models/avaliacaoServicoModel');

const cadastrar = async (req, res) => {
    const { servico_id, usuario_id, avaliacaoservico_nota, avaliacaoservico_comentario } = req.body;

    if (!servico_id || !usuario_id || !avaliacaoservico_nota) {
        return res.status(400).send("Preencha todos os campos obrigatórios.");
    }

    try {
        await avaliacaoServicoModel.cadastrar(servico_id, usuario_id, avaliacaoservico_nota, avaliacaoservico_comentario);
        res.status(201).send("Avaliação cadastrada com sucesso!");
    } catch (error) {
        res.status(500).send("Erro ao cadastrar avaliação: " + error.message);
    }
};

const listar = async (req, res) => {
    try {
        const result = await avaliacaoServicoModel.listar();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send("Erro ao listar avaliações: " + error.message);
    }
};

const buscarPorId = async (req, res) => {
    const { avaliacaoservico_id } = req.params;
    try {
        const result = await avaliacaoServicoModel.buscarPorId(avaliacaoservico_id);
        if (!result) {
            return res.status(404).send("Avaliação não encontrada.");
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send("Erro ao buscar avaliação: " + error.message);
    }
};

const atualizar = async (req, res) => {
    const { avaliacaoservico_id } = req.params;
    const { avaliacaoservico_nota, avaliacaoservico_comentario } = req.body;

    if (!avaliacaoservico_nota) {
        return res.status(400).send("Nota é obrigatória.");
    }

    try {
        await avaliacaoServicoModel.atualizar(avaliacaoservico_id, avaliacaoservico_nota, avaliacaoservico_comentario);
        res.status(200).send("Avaliação atualizada com sucesso!");
    } catch (error) {
        res.status(500).send("Erro ao atualizar avaliação: " + error.message);
    }
};

const deletar = async (req, res) => {
    const { avaliacaoservico_id } = req.params;
    try {
        await avaliacaoServicoModel.deletar(avaliacaoservico_id);
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