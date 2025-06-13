const consultaVeterinariaModel = require('../models/consultaVeterinariaModel');
const servicoModel = require('../models/servicoModel');
const animalModel = require('../models/animalModel');

const cadastrar = async (req, res) => {
  const {
    servico_id,
    consultaveterinaria_especialidade,
    consultaveterinaria_tipo,
    consultaveterinaria_vacinasaplicadas,
    consultaveterinaria_examesrealizados,
    animal_id,
  } = req.body;

  if (
    !servico_id ||
    !consultaveterinaria_especialidade ||
    !consultaveterinaria_tipo ||
    !animal_id
  ) {
    return res.status(400).send('Campos obrigatórios não preenchidos.');
  }

  try {
    const servico = await servicoModel.buscarPorId(servico_id);
    if (!servico) {
      return res.status(400).send("Serviço associado não encontrado.");
    }

    if (servico.servico_categoria !== 'CONSULTA') {
      return res.status(400).send("O serviço_id informado não corresponde a um serviço do tipo CONSULTA.");
    }

    const animal = await animalModel.buscarPorId(animal_id);
    if (!animal) {
        return res.status(400).send("O animal informado não existe.");
    }

    await consultaVeterinariaModel.cadastrar(
      servico_id,
      consultaveterinaria_especialidade,
      consultaveterinaria_tipo,
      consultaveterinaria_vacinasaplicadas || null,
      consultaveterinaria_examesrealizados || null,
      animal_id
    );
    res.status(201).send('Consulta veterinária cadastrada com sucesso!');
  } catch (error) {
    res.status(500).send('Erro ao cadastrar consulta: ' + error.message);
  }
};

const listarTodos = async (req, res) => {
  try {
    const consultas = await consultaVeterinariaModel.listarTodos();
    res.json(consultas);
  } catch (error) {
    res.status(500).send('Erro ao listar consultas: ' + error.message);
  }
};

const buscarPorId = async (req, res) => {
  const { consultaveterinaria_id } = req.params;
  try {
    const consulta = await consultaVeterinariaModel.buscarPorId(consultaveterinaria_id);
    if (!consulta) return res.status(404).send('Consulta não encontrada.');
    res.json(consulta);
  } catch (error) {
    res.status(500).send('Erro ao buscar consulta: ' + error.message);
  }
};

const atualizar = async (req, res) => {
  const { consultaveterinaria_id } = req.params;
  const {
    servico_id,
    consultaveterinaria_especialidade,
    consultaveterinaria_tipo,
    consultaveterinaria_vacinasaplicadas,
    consultaveterinaria_examesrealizados,
    animal_id,
  } = req.body;

  if (
    !servico_id ||
    !consultaveterinaria_especialidade ||
    !consultaveterinaria_tipo ||
    !animal_id
  ) {
    return res.status(400).send('Campos obrigatórios não preenchidos.');
  }

  try {
        const servico = await servicoModel.buscarPorId(servico_id);
    if (!servico) {
      return res.status(400).send("Serviço associado não encontrado.");
    }

    if (servico.servico_categoria !== 'CONSULTA') {
      return res.status(400).send("O serviço_id informado não corresponde a um serviço do tipo CONSULTA.");
    }

    const animal = await animalModel.buscarPorId(animal_id);
    if (!animal) {
        return res.status(400).send("O animal informado não existe.");
    }

    const consultaExistente = await consultaVeterinariaModel.buscarPorId(consultaveterinaria_id);
    if (!consultaExistente) return res.status(404).send('Consulta não encontrada.');

    await consultaVeterinariaModel.atualizar(
      consultaveterinaria_id,
      servico_id,
      consultaveterinaria_especialidade,
      consultaveterinaria_tipo,
      consultaveterinaria_vacinasaplicadas || null,
      consultaveterinaria_examesrealizados || null,
      animal_id
    );
    res.send('Consulta atualizada com sucesso!');
  } catch (error) {
    res.status(500).send('Erro ao atualizar consulta: ' + error.message);
  }
};

const deletar = async (req, res) => {
  const { consultaveterinaria_id } = req.params;

  try {
    const consultaExistente = await consultaVeterinariaModel.buscarPorId(consultaveterinaria_id);
    if (!consultaExistente) return res.status(404).send('Consulta não encontrada.');

    await consultaVeterinariaModel.deletar(consultaveterinaria_id);
    res.send('Consulta deletada com sucesso!');
  } catch (error) {
    res.status(500).send('Erro ao deletar consulta: ' + error.message);
  }
};

module.exports = {
  cadastrar,
  listarTodos,
  buscarPorId,
  atualizar,
  deletar,
};