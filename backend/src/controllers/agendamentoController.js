const agendamentoModel = require('../models/agendamentoModel');

const cadastrar = async (req, res) => {
  const { cliente_id, animal_id, servico_id, agendamento_status } = req.body;
  if (!cliente_id || !animal_id || !servico_id || !agendamento_status) {
    return res.status(400).send("Todos os campos de agendamento são obrigatórios.");
  }

  try {
    const resultado = await agendamentoModel.cadastrar(cliente_id, animal_id, servico_id, agendamento_status);
    const agendamento_id = resultado.insertId;

    const servico = await servicoModel.buscarPorId(servico_id);

    res.status(201).json({
      message: "Agendamento cadastrado com sucesso!",
      agendamento_id,
      servico_categoria: servico.servico_categoria,
      servico_id,
      animal_id
    });
  } catch (error) {
    res.status(500).send("Erro ao cadastrar agendamento: " + error.message);
  }
};

const listarTodos = async (req, res) => {
    try {
        const agendamentos = await agendamentoModel.listarTodos();
        res.json(agendamentos);
    } catch (error) {
        res.status(500).send("Erro ao listar agendamentos: " + error.message);
    }
};

const buscarPorId = async (req, res) => {
    const { agendamento_id } = req.params;

    try {
        const agendamento = await agendamentoModel.buscarPorId(agendamento_id);
        if (!agendamento) {
            return res.status(404).send("Agendamento não encontrado.");
        }
        res.json(agendamento);
    } catch (error) {
            return res.status(404).send("Agendamento não encontrado.");
    }
};

const atualizar = async (req, res) => {
    const { agendamento_id } = req.params;
    const {
        cliente_id,
        animal_id,
        servico_id,
        agendamento_status
    } = req.body;

    if (
        !agendamento_id,
        !cliente_id,
        !animal_id,
        !servico_id,
        !agendamento_status
    ) {
        return res.status(400).send("Todos os campos são obrigatórios para atualizar o agendamento.");
    }

    try {
        const agendamentoExistente = await agendamentoModel.buscarPorId(agendamento_id);
        if (!agendamentoExistente) {
            return res.status(404).send("Agendamento não encontrado.");
        }

        await agendamentoModel.atualizar(
        agendamento_id,
        cliente_id,
        animal_id,
        servico_id,
        agendamento_status
        );
        res.send("Agendamento atualizado com sucesso!");
    } catch (error) {
        res.status(500).send("Erro ao atualizar agendamento: " + error.message);
    }
};

const deletar = async (req, res) => {
    const { agendamento_id } = req.params;

    try {
        const agendamentoExistente = await agendamentoModel.buscarPorId(agendamento_id);
        if (!agendamentoExistente) {
            return res.status(404).send("Agendamento não encontrado.");
        }

        await agendamentoModel.deletar(agendamento_id);
        res.send("Agendamento deletado com sucesso!");
    } catch (error) {
        res.status(500).send("Erro ao deletar agendamento: " + error.message);
    }
};

module.exports = {
    cadastrar,
    listarTodos,
    buscarPorId,
    atualizar,
    deletar
};