const compraModel = require('../models/compraModel');

const listarTodos = async (req, res) => {
    try {
        const compras = await compraModel.listarTodos();
        res.json(compras);
    } catch (err) {
        res.status(500).send("Erro ao listar compras: " + err.message);
    }
};

const buscarPorId = async (req, res) => {
    const { compra_id } = req.params;
    try {
        const compra = await compraModel.buscarPorId(compra_id);
        if (!compra) return res.status(404).send("Compra não encontrada");
        res.json(compra);
    } catch (err) {
        res.status(500).send("Erro ao buscar compra: " + err.message);
    }
};

const buscarPorUsuario = async (req, res) => {
    const { usuario_id } = req.params;
    try {
        const compras = await compraModel.buscarPorUsuario(usuario_id);
        res.json(compras);
    } catch (err) {
        res.status(500).send("Erro ao buscar compras do usuário: " + err.message);
    }
};

const deletar = async (req, res) => {
    const { compra_id } = req.params;
    try {
        const existe = await compraModel.buscarPorId(compra_id);
        if (!existe) return res.status(404).send("Compra não encontrada");
        await compraModel.deletar(compra_id);
        res.send("Compra deletada com sucesso");
    } catch (err) {
        res.status(500).send("Erro ao deletar compra: " + err.message);
    }
};

module.exports = {
    listarTodos,
    buscarPorId,
    buscarPorUsuario,
    deletar
};
