const passeioModel = require('../models/passeioModel');
const servicoModel = require('../models/servicoModel');
const animalModel = require('../models/animalModel');
const agendamentoModel = require('../models/agendamentoModel');

const cadastrar = async (req, res) => {
    const {
        animal_id,
        passeio_tipo,
        passeio_nivelatividade
    } = req.body;

    const servico_id = 2; // id fixo para Passeio
    const agendamento_status = 'PENDENTE';

    if (!animal_id || !passeio_tipo || !passeio_nivelatividade) {
        return res.status(400).send('Campos obrigatórios não preenchidos.');
    }

    try {
        // 1. Cadastrar agendamento e obter o id
        const agendamentoResult = await agendamentoModel.cadastrar(
            req.usuario.id, // usuario_id vindo do token
            animal_id,
            servico_id,
            agendamento_status,
            new Date()
        );

        const agendamento_id = agendamentoResult.insertId;

        // 2. Cadastrar passeio com o agendamento_id vinculado
        const passeioResult = await passeioModel.cadastrar(
            servico_id,
            passeio_tipo,
            passeio_nivelatividade,
            animal_id,
            agendamento_id
        );

        res.status(201).json({
            message: 'Agendamento de passeio cadastrado com sucesso!',
            agendamento_id,
            passeio_id: passeioResult.insertId
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao cadastrar passeio: ' + error.message);
    }
};


const listarTodos = async (req, res) => {
  try {
    const [passeios] = await passeioModel.listarTodos();
    res.json(passeios);
  } catch (error) {
    res.status(500).send("Erro ao listar passeios: " + error.message);
  }
};

const buscarPorId = async (req, res) => {
  const { passeio_id } = req.params;
  try {
    const [passeios] = await passeioModel.buscarPorId(passeio_id);
    if (passeios.length === 0) return res.status(404).send("Passeio não encontrado.");
    res.json(passeios[0]);
  } catch (error) {
    res.status(500).send("Erro ao buscar passeio: " + error.message);
  }
};

const atualizar = async (req, res) => {
  const { passeio_id } = req.params;
  const {
    servico_id,
    passeio_duracao,
    passeio_tipo,
    passeio_nivelatividade,
    animal_id
  } = req.body;

  if (!servico_id || !passeio_duracao || !passeio_tipo || !passeio_nivelatividade || !animal_id) {
    return res.status(400).send("Todos os campos são obrigatórios.");
  }

  try {
    const servico = await servicoModel.buscarPorId(servico_id);
    if (!servico) {
      return res.status(400).send("Serviço associado não encontrado.");
    }

    if (servico.servico_categoria !== 'PASSEIO') {
      return res.status(400).send("O serviço_id informado não corresponde a um serviço do tipo PASSEIO.");
    }

    const animal = await animalModel.buscarPorId(animal_id);
    if (!animal) {
      return res.status(400).send("O animal informado não existe.");
    }

    await passeioModel.atualizar(
      passeio_id,
      servico_id,
      passeio_duracao,
      passeio_tipo,
      passeio_nivelatividade,
      animal_id
    );
    res.send("Passeio atualizado com sucesso!");
  } catch (error) {
    res.status(500).send("Erro ao atualizar passeio: " + error.message);
  }
};

const deletar = async (req, res) => {
  const { passeio_id } = req.params;
  try {
    const [passeio] = await passeioModel.buscarPorId(passeio_id);
    if (passeio.length === 0) return res.status(404).send("Passeio não encontrado.");

    await passeioModel.deletar(passeio_id);
    res.send("Passeio deletado com sucesso!");
  } catch (error) {
    res.status(500).send("Erro ao deletar passeio: " + error.message);
  }
};

module.exports = {
  cadastrar,
  listarTodos,
  buscarPorId,
  atualizar,
  deletar
};