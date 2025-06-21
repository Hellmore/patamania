const hospedagemModel = require('../models/hospedagemModel');
const servicoModel = require('../models/servicoModel');
const animalModel = require('../models/animalModel');
const agendamentoModel = require('../models/agendamentoModel');

const cadastrar = async (req, res) => {
    const {
        animal_id,
        hospedagem_tipo,
        hospedagem_necessidadesespeciais
    } = req.body;

    const servico_id = 4; // id fixo para HOSPEDAGEM (ajuste conforme seu banco)
    const agendamento_status = 'PENDENTE';

    if (!animal_id || !hospedagem_tipo || !hospedagem_necessidadesespeciais) {
        return res.status(400).send('Campos obrigatórios não preenchidos.');
    }

    try {
        // 1. Cadastrar agendamento
        const agendamentoResult = await agendamentoModel.cadastrar(
            req.usuario.id, // usuario_id vindo do token
            animal_id,
            servico_id,
            agendamento_status,
            new Date()
        );

        const agendamento_id = agendamentoResult.insertId;

        // 2. Cadastrar hospedagem vinculando ao agendamento
        const hospedagemResult = await hospedagemModel.cadastrar(
            servico_id,
            hospedagem_tipo,
            hospedagem_necessidadesespeciais,
            animal_id,
            agendamento_id
        );

        res.status(201).json({
            message: 'Agendamento de hospedagem cadastrado com sucesso!',
            agendamento_id,
            hospedagem_id: hospedagemResult.insertId
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao cadastrar hospedagem: ' + error.message);
    }
};

const listarTodos = async (req, res) => {
  try {
    const hospedagens = await hospedagemModel.listarTodos();
    res.json(hospedagens);
  } catch (error) {
    res.status(500).send("Erro ao listar hospedagens: " + error.message);
  }
};

const buscarPorId = async (req, res) => {
  const { hospedagem_id } = req.params;
  try {
    const hospedagem = await hospedagemModel.buscarPorId(hospedagem_id);
    if (!hospedagem) return res.status(404).send("Hospedagem não encontrada.");
    res.json(hospedagem);
  } catch (error) {
    res.status(500).send("Erro ao buscar hospedagem: " + error.message);
  }
};

const atualizar = async (req, res) => {
  const { hospedagem_id } = req.params;
  const {
    servico_id,
    hospedagem_tipo,
    hospedagem_necessidadesespeciais,
    animal_id
  } = req.body;

  if (!servico_id || !hospedagem_tipo || !hospedagem_necessidadesespeciais || !animal_id) {
    return res.status(400).send("Todos os campos são obrigatórios.");
  }

  try {
    const servico = await servicoModel.buscarPorId(servico_id);
    if (!servico) {
      return res.status(400).send("Serviço associado não encontrado.");
    }

    if (servico.servico_categoria !== 'HOSPEDAGEM') {
      return res.status(400).send("O serviço_id informado não corresponde a um serviço do tipo HOSPEDAGEM.");
    }

    const animal = await animalModel.buscarPorId(animal_id);
    if (!animal) {
        return res.status(400).send("O animal informado não existe.");
    }

    await hospedagemModel.atualizar(
      hospedagem_id,
      servico_id,
      hospedagem_tipo,
      hospedagem_necessidadesespeciais,
      animal_id
    );
    res.send("Hospedagem atualizada com sucesso!");
  } catch (error) {
    res.status(500).send("Erro ao atualizar hospedagem: " + error.message);
  }
};

const deletar = async (req, res) => {
  const { hospedagem_id } = req.params;
  try {
    await hospedagemModel.deletar(hospedagem_id);
    res.send("Hospedagem deletada com sucesso!");
  } catch (error) {
    res.status(500).send("Erro ao deletar hospedagem: " + error.message);
  }
};

module.exports = {
  cadastrar,
  listarTodos,
  buscarPorId,
  atualizar,
  deletar
};