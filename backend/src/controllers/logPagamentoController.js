const logPagamentoModel = require('../models/logPagamentoModel');

const cadastrar = async (req, res) => {
    const { logpagamento_id, pagamento_id, logpagamento_acao, logpagamento_datahora, logpagamento_descricao } = req.body;
    if (!logpagamento_id || !pagamento_id || !logpagamento_acao || !logpagamento_datahora || !logpagamento_descricao) {
        return res.status(400).send("Todos os campos de Log Pagamento são obrigatórios!");
    }
    try {
        await logPagamentoModel.cadastrar(logpagamento_id, pagamento_id, logpagamento_acao, logpagamento_datahora, logpagamento_descricao);
        res.status(201).send("Log de pagamento registrado com sucesso");
    } catch (err) {
        res.status(500).send("Erro ao registrar log: " + err.message);
    }
};

const listarTodos = async (req, res) => {
    try {
        const logs = await logPagamentoModel.listarTodos();
        res.json(logs);
    } catch (err) {
        res.status(500).send("Erro ao listar logs: " + err.message);
    }
};

module.exports = {
    cadastrar,
    listarTodos
};
