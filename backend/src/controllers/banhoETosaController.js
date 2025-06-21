const banhoETosaModel = require('../models/banhoETosaModel');
const servicoModel = require('../models/servicoModel');
const animalModel = require('../models/animalModel');

const cadastrar = async (req, res) => {
  try {
    const { usuario_id, animal_id, servico_id, agendamento_status, banhoetosa_tipotosa, banhoetosa_produtosutilizados } = req.body;

    // Validação básica
    if (!usuario_id || !animal_id || !servico_id || !agendamento_status || !banhoetosa_tipotosa) {
      return res.status(400).send("Todos os campos obrigatórios precisam ser preenchidos.");
    }

    // 1) Cadastrar na tabela agendamento
    const resultadoAgendamento = await agendamentoModel.cadastrar(
      usuario_id,
      animal_id,
      servico_id,
      agendamento_status
    );
    const agendamento_id = resultadoAgendamento.insertId;

    // 2) Cadastrar na tabela banho_e_tosa, relacionando com o agendamento_id
    await banhoETosaModel.cadastrar(
      agendamento_id, // associar agendamento
      servico_id,
      banhoetosa_tipotosa,
      banhoetosa_produtosutilizados,
      animal_id
    );

    return res.status(201).json({
      message: "Banho e Tosa agendado com sucesso!",
      agendamento_id
    });

  } catch (error) {
    console.error("Erro ao cadastrar banho e tosa:", error);
    return res.status(500).send("Erro ao cadastrar banho e tosa: " + error.message);
  }
};

const listarTodos = async (req, res) => {
  try {
    const lista = await banhoETosaModel.listarTodos();
    res.json(lista);
  } catch (error) {
    res.status(500).send("Erro ao listar banho e tosa: " + error.message);
  }
};

const buscarPorId = async (req, res) => {
  const { banhoetosa_id } = req.params;
  try {
    const item = await banhoETosaModel.buscarPorId(banhoetosa_id);
    if (!item) return res.status(404).send("Banho e tosa não encontrado.");
    res.json(item);
  } catch (error) {
    res.status(500).send("Erro ao buscar banho e tosa: " + error.message);
  }
};

const atualizar = async (req, res) => {
  const { banhoetosa_id } = req.params;
  const {
    servico_id,
    banhoetosa_tipotosa,
    banhoetosa_produtosutilizados,
    animal_id
  } = req.body;

  if (!servico_id || !banhoetosa_tipotosa || !banhoetosa_produtosutilizados || !animal_id) {
    return res.status(400).send("Todos os campos são obrigatórios.");
  }

  try {
    const servico = await servicoModel.buscarPorId(servico_id);
    if (!servico) {
      return res.status(400).send("Serviço associado não encontrado.");
    }

    if (servico.servico_categoria !== 'BANHO E TOSA') {
      return res.status(400).send("O serviço_id informado não corresponde a um serviço do tipo BANHO E TOSA.");
    }

    const animal = await animalModel.buscarPorId(animal_id);
    if (!animal) {
        return res.status(400).send("O animal informado não existe.");
    }

    await banhoETosaModel.atualizar(
      banhoetosa_id,
      servico_id,
      banhoetosa_tipotosa,
      banhoetosa_produtosutilizados,
      animal_id
    );
    res.send("Banho e tosa atualizado com sucesso!");
  } catch (error) {
    res.status(500).send("Erro ao atualizar banho e tosa: " + error.message);
  }
};

const deletar = async (req, res) => {
  const { banhoetosa_id } = req.params;
  try {
    await banhoETosaModel.deletar(banhoetosa_id);
    res.send("Banho e tosa deletado com sucesso!");
  } catch (error) {
    res.status(500).send("Erro ao deletar banho e tosa: " + error.message);
  }
};

module.exports = {
  cadastrar,
  listarTodos,
  buscarPorId,
  atualizar,
  deletar
};