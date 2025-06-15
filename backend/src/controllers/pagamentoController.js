const pagamentoModel = require('../models/pagamentoModel');

const cadastrar = async (req, res) => {
    const {
        pagamento_forma,
        pagamento_status,
        usuario_id,
        pagamento_valor_final,
        endereco_id
    } = req.body;

    // Verificação dos campos obrigatórios
    if (!pagamento_forma || !pagamento_status || !usuario_id || !pagamento_valor_final || !endereco_id) {
        return res.status(400).send("Campos obrigatórios: pagamento_forma, pagamento_status, usuario_id, pagamento_valor_final, endereco_id");
    }

    try {
        await pagamentoModel.cadastrar(
            pagamento_forma,
            pagamento_status,
            usuario_id,
            pagamento_valor_final,
            endereco_id
        );
        res.status(201).send("Pagamento registrado com sucesso");
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao registrar pagamento: " + err.message);
    }
};


const listarTodos = async (req, res) => {
    try {
        const pagamentos = await pagamentoModel.listarTodos();
        res.json(pagamentos);
    } catch (err) {
        res.status(500).send("Erro ao listar pagamentos: " + err.message);
    }
};

const buscarPorId = async (req, res) => {
    const { pagamento_id } = req.params;
    try {
        const pagamento = await pagamentoModel.buscarPorId(pagamento_id);
        if (!pagamento) return res.status(404).send("Pagamento não encontrado");
        res.json(pagamento);
    } catch (err) {
        res.status(500).send("Erro ao buscar pagamento: " + err.message);
    }
};

const atualizar = async (req, res) => {
    const { pagamento_id } = req.params;
    const {
        pagamento_forma,
        pagamento_status,
        usuario_id,
        pagamento_valor_final,
        endereco_id
    } = req.body;

    // Verificar os campos obrigatórios corretos:
    if (!pagamento_forma || !pagamento_status || !usuario_id || !pagamento_valor_final || !endereco_id) {
        return res.status(400).send("Campos obrigatórios: pagamento_forma, pagamento_status, usuario_id, pagamento_valor_final, endereco_id");
    }

    try {
        const existe = await pagamentoModel.buscarPorId(pagamento_id);
        if (!existe) return res.status(404).send("Pagamento não encontrado");

        // Passar pagamento_id como último parâmetro para o WHERE
        const atualizado = await pagamentoModel.atualizar(
            pagamento_forma,
            pagamento_status,
            usuario_id,
            pagamento_valor_final,
            endereco_id,
            pagamento_id
        );

        if (!atualizado) {
            return res.status(500).send("Erro ao atualizar pagamento");
        }

        res.send("Pagamento atualizado com sucesso");
    } catch (err) {
        res.status(500).send("Erro ao atualizar pagamento: " + err.message);
    }
};


const deletar = async (req, res) => {
    const { pagamento_id } = req.params;
    try {
        const existe = await pagamentoModel.buscarPorId(pagamento_id);
        if (!existe) return res.status(404).send("Pagamento não encontrado");
        await pagamentoModel.deletar(pagamento_id);
        res.send("Pagamento deletado com sucesso");
    } catch (err) {
        res.status(500).send("Erro ao deletar pagamento: " + err.message);
    }
};

module.exports = {
    cadastrar,
    listarTodos,
    buscarPorId,
    atualizar,
    deletar
};
