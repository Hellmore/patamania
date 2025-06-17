const cupomDescontoModel = require('../models/cupomDescontoModel');

const cadastrar = async (req, res) => {
    const {
        cupomdesconto_codigo,
        cupomdesconto_descricao,
        cupomdesconto_descontopercentual,
        cupomdesconto_validade
    } = req.body;

    if (!cupomdesconto_codigo || !cupomdesconto_descricao || !cupomdesconto_descontopercentual || !cupomdesconto_validade) {
        return res.status(400).send("Campos obrigatórios: código, descrição, percentual de desconto e validade.");
    }

    try {
        await cupomDescontoModel.cadastrar(
            cupomdesconto_codigo,
            cupomdesconto_descricao,
            cupomdesconto_descontopercentual,
            cupomdesconto_validade
        );
        res.status(201).send("Cupom cadastrado com sucesso!");
    } catch (err) {
    console.error("Erro ao cadastrar cupom:", err);
    res.status(500).send("Erro ao cadastrar cupom: " + err.message);
    }
};


const listarTodos = async (req, res) => {
    try {
        const cupons = await cupomDescontoModel.listarTodos();
        res.json(cupons);
    } catch (err) {
        res.status(500).send("Erro ao listar cupons: " + err.message);
    }
};

const buscarPorCodigo = async (req, res) => {
    const { cupom_codigo } = req.params;

    try {
        const cupom = await cupomDescontoModel.buscarPorCodigo(cupom_codigo);
        if (!cupom) return res.status(404).send("Cupom não encontrado.");
        res.json(cupom);
    } catch (err) {
        res.status(500).send("Erro ao buscar cupom: " + err.message);
    }
};

const deletar = async (req, res) => {
    const { cupom_codigo } = req.params;

    try {
        const existe = await cupomDescontoModel.buscarPorCodigo(cupom_codigo);
        if (!existe) return res.status(404).send("Cupom não encontrado.");

        await cupomDescontoModel.deletar(cupom_codigo);
        res.send("Cupom deletado com sucesso.");
    } catch (err) {
        res.status(500).send("Erro ao deletar cupom: " + err.message);
    }
};

module.exports = {
    cadastrar,
    listarTodos,
    buscarPorCodigo,
    deletar
};
