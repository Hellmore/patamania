const servicoModel = require('../models/servicoModel');

const cadastrar = async (req, res) => {
  try {
    const { servico } = req.body;

    // 1. Cadastrar serviço principal
    const servicoResult = await servicoModel.cadastrar(
      servico.nome,
      servico.descricao,
      servico.categoria,
      servico.preco,
      servico.disponibilidade,
      servico.localizacao,
      servico.profissionalResponsavel,
      servico.responsavelAgendamento,
      servico.duracao,
      servico.taxa
    );

    res.status(201).json({
      success: true,
      message: 'Serviço cadastrado com sucesso'
    });
  } catch (error) {
    console.error('Erro no cadastro serviço:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao cadastrar serviço',
      error: error.message
    });
  }
};

const listarTodos = async (req, res) => {
  try {
    const servicos = await servicoModel.listarTodos();
    res.json(servicos);
  } catch (error) {
    res.status(500).send("Erro ao listar serviços: " + error.message);
  }
};

const listarComResponsaveisECriador  = async (req, res) => {
  try {
    const servicos = await servicoModel.listarComResponsaveisECriador();
    res.status(200).json(servicos);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao listar serviços',
      error: error.message
    });
  }
};

const buscarPorId = async (req, res) => {
  const { servico_id } = req.params;
  try {
    const servico = await servicoModel.buscarPorId(servico_id);
    if (!servico) return res.status(404).send("Serviço não encontrado.");
    res.json(servico);
  } catch (error) {
    res.status(500).send("Erro ao buscar serviço: " + error.message);
  }
};

const atualizar = async (req, res) => {
  const { servico_id } = req.params;

  try {
    const servicoExistente = await servicoModel.buscarPorId(servico_id);
    if (!servicoExistente) {
      return res.status(404).send("Serviço não encontrado.");
    }

    await servicoModel.atualizar(
      servico_id,
      req.body.servico_nome,
      req.body.servico_descricao,
      req.body.servico_categoria,
      req.body.servico_preco,
      req.body.servico_disponibilidade,
      req.body.servico_localizacao,
      req.body.servico_profissionalresponsavel,
      req.body.servico_responsavelagendamento,
      req.body.servico_duracao,
      req.body.servico_taxa
    );

    res.status(200).json({
      success: true,
      message: "Serviço atualizado com sucesso!"
    });
  } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erro ao atualizar serviço: " + error.message
      });
    }
};


const deletar = async (req, res) => {
  const { servico_id } = req.params;
  try {
    const servicoExistente = await servicoModel.buscarPorId(servico_id);
    if (!servicoExistente) return res.status(404).send("Serviço não encontrado.");

    await servicoModel.deletar(servico_id);
    res.send("Serviço deletado com sucesso!");
  } catch (error) {
    if (error.code === 'ER_ROW_IS_REFERENCED_2') {
      return res.status(400).send("Não é possível deletar este serviço porque ele está vinculado a agendamentos.");
    }
    res.status(500).send("Erro ao deletar serviço: " + error.message);
  }
};

module.exports = {
  cadastrar,
  listarTodos,
  listarComResponsaveisECriador,
  buscarPorId,
  atualizar,
  deletar
};