const compraItemSelecionadoModel = require('../models/compraItemSelecionadoModel');

const cadastrar = async (req, res) => {
    const { compra_id, item_id } = req.body;
    if (compra_id == null || item_id == null) {
        return res.status(400).send("Campos obrigatórios: compra_id, item_id");
    }
    try {
        await compraItemSelecionadoModel.cadastrar(compra_id, item_id);
        res.status(201).send("Item selecionado para compra registrado");
    } catch (err) {
        res.status(500).send("Erro ao registrar item selecionado: " + err.message);
    }
};


const listarTodos = async (req, res) => {
    try {
        const registros = await compraItemSelecionadoModel.listarTodos();
        res.json(registros);
    } catch (err) {
        res.status(500).send("Erro ao listar itens selecionados: " + err.message);
    }
};

const deletar = async (req, res) => {
    // Opcional, se quiser permitir remover associação
    const { compra_id, item_id } = req.body;
    if (!compra_id || !item_id) {
        return res.status(400).send("Campos obrigatórios: compra_id, item_id");
    }
    try {
        await compraItemSelecionadoModel.deletar(compra_id, item_id);
        res.send("Item removido da compra selecionada");
    } catch (err) {
        res.status(500).send("Erro ao remover item selecionado: " + err.message);
    }
};

module.exports = {
    cadastrar,
    listarTodos,
    deletar
};
