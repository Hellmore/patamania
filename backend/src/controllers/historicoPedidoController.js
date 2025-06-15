const historicoPedidoModel = require('../models/historicoPedidoModel');

const cadastrar = async (req, res) => {
    const { historicopedido_id, compra_id, historicopedido_status, historicopedido_datahora, historicopedido_observacao } = req.body;
    if ( !historicopedido_id || !compra_id || !historicopedido_status || !historicopedido_datahora || !historicopedido_observacao) {
        return res.status(400).send("Todos os campos de Historico Pedido são obrigatórios!");
    }
    try {
        await historicoPedidoModel.cadastrar(historicopedido_id, compra_id, historicopedido_status, historicopedido_datahora, historicopedido_observacao);
        res.status(201).send("Histórico registrado com sucesso");
    } catch (err) {
        res.status(500).send("Erro ao registrar histórico: " + err.message);
    }
};

const listarTodos = async (req, res) => {
    try {
        const historicos = await historicoPedidoModel.listarTodos();
        res.json(historicos);
    } catch (err) {
        res.status(500).send("Erro ao listar históricos: " + err.message);
    }
};

module.exports = {
    cadastrar,
    listarTodos
};
