const pagamentoModel = require('../models/pagamentoModel');
const db = require('../utils/db');

const cadastrar = async (req, res) => {
    const {
        pagamento_forma,
        pagamento_status,
        usuario_id,
        nome_usuario,
        endereco_id,
        codigo_seguranca,
        cupom,
        parcelas
    } = req.body;

    if (
        !pagamento_forma ||
        !pagamento_status ||
        !usuario_id ||
        !nome_usuario ||
        !endereco_id ||
        !codigo_seguranca
    ) {
        return res.status(400).send("Campos obrigatórios: pagamento_forma, pagamento_status, usuario_id, nome_usuario, endereco_id, codigo_seguranca");
    }

    const parcelasValidadas = parcelas && parcelas >= 1 ? parcelas : 1;

    // Validação 1: Parcelamento só com cartão e numero parcelas
    if (parcelasValidadas > 1 && pagamento_forma !== 'CARTAO') {
    return res.status(400).send('Parcelamento só é permitido com a forma de pagamento CARTAO.');
    } else if ((parcelasValidadas > 6 || parcelasValidadas < 1) && pagamento_forma === 'CARTAO') {
    return res.status(400).send('Parcelamento permitido entre 1 e 6 parcelas.');
    }


    try {
        // Executa a procedure de cálculo do valor com cupom
        await db.promise().query('CALL sp_calcular_valor_carrinho_com_cupom(?, ?, @valor_original, @valor_com_desconto, @cupom_id, @desconto)', [usuario_id, cupom || null]);

        const [rows] = await db.promise().query('SELECT @valor_com_desconto AS valor_final');

        const valorFinal = rows[0].valor_final;

        // Validação 2: Valor mínimo de R$300 para parcelar
        if (parcelasValidadas > 1 && valorFinal < 300) {
            return res.status(400).send('Parcelamento só é permitido para valores acima de R$ 300,00.');
        }

        await pagamentoModel.cadastrar(
            pagamento_forma,
            pagamento_status,
            usuario_id,
            nome_usuario,
            endereco_id,
            codigo_seguranca,
            cupom || null,
            parcelasValidadas
        );

        res.status(201).json({
            mensagem: 'Pagamento registrado com sucesso!',
            dados: {
                pagamento_forma,
                pagamento_status,
                nome_usuario,
                endereco_id,
                cupom: cupom || null,
                parcelas: parcelasValidadas
            }
        });
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

    if (!pagamento_forma || !pagamento_status || !usuario_id || !pagamento_valor_final || !endereco_id) {
        return res.status(400).send("Campos obrigatórios: pagamento_forma, pagamento_status, usuario_id, pagamento_valor_final, endereco_id");
    }

    try {
        const existe = await pagamentoModel.buscarPorId(pagamento_id);
        if (!existe) return res.status(404).send("Pagamento não encontrado");

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
