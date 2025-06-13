const hospedagemModel = require('../models/hospedagemModel');
const servicoModel = require('../models/servicoModel');
const animalModel = require('../models/animalModel');

const cadastrar = async (req, res) => {
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

    await hospedagemModel.cadastrar(
      servico_id,
      hospedagem_tipo,
      hospedagem_necessidadesespeciais,
      animal_id
    );
    res.status(201).send("Hospedagem cadastrada com sucesso!");
  } catch (error) {
    res.status(500).send("Erro ao cadastrar hospedagem: " + error.message);
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