const historicoAnimalModel = require('../models/historicoAnimalModel');

const cadastrar = async (req, res) => {
    const {
        animal_id,
        agendamento_id,
        historicoanimal_descricao,
        historicoanimal_vacinas,
        historicoanimal_medicamentos
    } = req.body;

    if (
        !animal_id ||
        !agendamento_id ||
        !historicoanimal_descricao ||
        !historicoanimal_vacinas ||
        !historicoanimal_medicamentos
    ) {
        return res.status(400).send("Todos os campos de Histórico Animal são obrigatórios!");
    }

    try {
        await historicoAnimalModel.cadastrar(
            animal_id,
            agendamento_id,
            historicoanimal_descricao,
            historicoanimal_vacinas,
            historicoanimal_medicamentos
        );
        res.status(201).send("Histórico do animal registrado com sucesso!");
    } catch (err) {
        res.status(500).send("Erro ao registrar histórico: " + err.message);
    }
};

const listarTodos = async (req, res) => {
    try {
        const historicos = await historicoAnimalModel.listarTodos();
        res.json(historicos);
    } catch (err) {
        res.status(500).send("Erro ao listar históricos: " + err.message);
    }
};

const buscarPorId = async (req, res) => {
    const { historicoanimal_id } = req.params;

    try {
        const historico = await historicoAnimalModel.buscarPorId(historicoanimal_id);
        if (!historico) {
            return res.status(404).send("Histórico não encontrado.");
        }
        res.json(historico);
    } catch (err) {
        res.status(500).send("Erro ao buscar histórico: " + err.message);
    }
};

module.exports = {
    cadastrar,
    listarTodos,
    buscarPorId
};