const agendamentoModel = require('../models/agendamentoModel');
const servicoModel = require('../models/servicoModel');
const banhoETosaModel = require('../models/banhoETosaModel');
const consultaVeterinariaModel = require('../models/consultaVeterinariaModel');
const passeioModel = require('../models/passeioModel');
const hospedagemModel = require('../models/hospedagemModel');

const cadastrar = async (req, res) => {
  const { usuario_id, animal_id, servico_id, agendamento_status } = req.body;
  if (!usuario_id || !animal_id || !servico_id || !agendamento_status) {
    return res.status(400).send("Todos os campos de agendamento são obrigatórios.");
  }

  try {
    const resultado = await agendamentoModel.cadastrar(usuario_id, animal_id, servico_id, agendamento_status);
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

const cadastrarAgendamentoBanhoETosa = async (req, res) => {
    const {
        usuario_id,
        animal_id,
        servico_id,
        agendamento_status,
        agendamento_datahora,
        banhoetosa_tipotosa,
        banhoetosa_produtosutilizados
    } = req.body;

    if (!usuario_id || !animal_id || !servico_id || !agendamento_status || !agendamento_datahora || !banhoetosa_tipotosa) {
        return res.status(400).send("Todos os campos são obrigatórios.");
    }

    try {
        // 1. Cadastrar Agendamento
        const resultAgendamento = await agendamentoModel.cadastrar(
            usuario_id,
            animal_id,
            servico_id,
            agendamento_status,
            agendamento_datahora
        );

        const agendamento_id = resultAgendamento.insertId;

        // 2. Cadastrar Banho e Tosa
        const resultBanho = await banhoETosaModel.cadastrar(
            agendamento_id,
            servico_id,
            animal_id,
            banhoetosa_tipotosa,
            banhoetosa_produtosutilizados
        );

        res.status(201).json({
            message: "Agendamento de banho e tosa cadastrado com sucesso!",
            agendamento_id,
            banhoetosa_id: resultBanho.insertId
        });

    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao cadastrar agendamento: " + error.message);
    }
};

const cadastrarAgendamentoConsulta = async (req, res) => {
    const {
        usuario_id,
        animal_id,
        servico_id,
        agendamento_status,
        agendamento_datahora,
        consultaveterinaria_especialidade,
        consultaveterinaria_tipo,
        consultaveterinaria_vacinasaplicadas,
        consultaveterinaria_examesrealizados
    } = req.body;

    if (!usuario_id || !animal_id || !servico_id || !agendamento_status || !agendamento_datahora || !consultaveterinaria_especialidade || !consultaveterinaria_tipo) {
        return res.status(400).send("Todos os campos obrigatórios devem ser preenchidos.");
    }

    try {
        const resultAgendamento = await agendamentoModel.cadastrar(
            usuario_id,
            animal_id,
            servico_id,
            agendamento_status,
            agendamento_datahora
        );

        const agendamento_id = resultAgendamento.insertId;

        const resultConsulta = await consultaVeterinariaModel.cadastrar(
            servico_id,
            consultaveterinaria_especialidade,
            consultaveterinaria_tipo,
            consultaveterinaria_vacinasaplicadas,
            consultaveterinaria_examesrealizados,
            animal_id,
            agendamento_id
        );

        res.status(201).json({
            message: "Agendamento de consulta veterinária cadastrado com sucesso!",
            agendamento_id,
            consultaveterinaria_id: resultConsulta.insertId
        });

    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao cadastrar agendamento: " + error.message);
    }
};

const cadastrarAgendamentoPasseio = async (req, res) => {
    const {
        usuario_id,
        animal_id,
        servico_id,
        agendamento_status,
        agendamento_datahora,
        passeio_tipo,
        passeio_nivelatividade
    } = req.body;

    if (!usuario_id || !animal_id || !servico_id || !agendamento_status || !agendamento_datahora || !passeio_tipo || !passeio_nivelatividade) {
        return res.status(400).send("Todos os campos obrigatórios devem ser preenchidos.");
    }

    try {
        const resultAgendamento = await agendamentoModel.cadastrar(
            usuario_id,
            animal_id,
            servico_id,
            agendamento_status,
            agendamento_datahora
        );

        const agendamento_id = resultAgendamento.insertId;

        const resultPasseio = await passeioModel.cadastrar(
            servico_id,
            passeio_tipo,
            passeio_nivelatividade,
            animal_id,
            agendamento_id
        );

        res.status(201).json({
            message: "Agendamento de passeio cadastrado com sucesso!",
            agendamento_id,
            passeio_id: resultPasseio.insertId
        });

    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao cadastrar agendamento: " + error.message);
    }
};

const cadastrarAgendamentoHospedagem = async (req, res) => {
    const {
        usuario_id,
        animal_id,
        servico_id,
        agendamento_status,
        agendamento_datahora,
        hospedagem_tipo,
        hospedagem_necessidadesespeciais
    } = req.body;

    if (
        !usuario_id ||
        !animal_id ||
        !servico_id ||
        !agendamento_status ||
        !agendamento_datahora ||
        !hospedagem_tipo ||
        !hospedagem_necessidadesespeciais
    ) {
        return res.status(400).send("Todos os campos obrigatórios devem ser preenchidos.");
    }

    try {
        // 1) Cadastrar agendamento
        const resultAgendamento = await agendamentoModel.cadastrar(
            usuario_id,
            animal_id,
            servico_id,
            agendamento_status,
            agendamento_datahora
        );

        const agendamento_id = resultAgendamento.insertId;

        // 2) Cadastrar hospedagem vinculada ao agendamento
        const resultHospedagem = await hospedagemModel.cadastrar(
            servico_id,
            hospedagem_tipo,
            hospedagem_necessidadesespeciais,
            animal_id,
            agendamento_id
        );

        res.status(201).json({
            message: "Agendamento de hospedagem cadastrado com sucesso!",
            agendamento_id,
            hospedagem_id: resultHospedagem.insertId
        });

    } catch (error) {
        console.error(error);
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
        usuario_id,
        animal_id,
        servico_id,
        agendamento_status
    } = req.body;

    if (
        !agendamento_id,
        !usuario_id,
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
        usuario_id,
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
    cadastrarAgendamentoBanhoETosa,
    cadastrarAgendamentoConsulta,
    cadastrarAgendamentoPasseio,
    cadastrarAgendamentoHospedagem,
    listarTodos,
    buscarPorId,
    atualizar,
    deletar
};