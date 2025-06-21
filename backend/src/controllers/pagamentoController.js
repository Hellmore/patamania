const pagamentoModel = require('../models/pagamentoModel');

const cadastrar = async (req, res) => {
  try {
    let {
      pagamento_forma,
      pagamento_status,
      usuario_id,
      nome_usuario,
      endereco_id,
      cupom,
      parcelas,
      item_ids // array ou string '13,14'
    } = req.body;

    if (!pagamento_forma || !pagamento_status || !usuario_id || !nome_usuario || !endereco_id || !item_ids) {
      return res.status(400).send("Campos obrigatórios: pagamento_forma, pagamento_status, usuario_id, nome_usuario, endereco_id, item_ids");
    }

    // Converter item_ids para string se for array
    if (Array.isArray(item_ids)) {
      item_ids = item_ids.join(',');
    }

    if (item_ids.trim() === '') {
      return res.status(400).send("item_ids não pode ser vazio");
    }

    const parcelasValidadas = parcelas && parcelas >= 1 ? parcelas : 1;

    // Validação parcelamento
    if (parcelasValidadas > 1 && pagamento_forma !== 'CARTAO') {
      return res.status(400).send('Parcelamento só é permitido com a forma de pagamento CARTAO.');
    }
    if ((parcelasValidadas > 6 || parcelasValidadas < 1) && pagamento_forma === 'CARTAO') {
      return res.status(400).send('Parcelamento permitido entre 1 e 6 parcelas.');
    }

    // Executa cadastro no model passando item_ids como array
    const itemIdsArray = item_ids.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id));

    const result = await pagamentoModel.cadastrar(
      pagamento_forma,
      pagamento_status,
      usuario_id,
      nome_usuario,
      endereco_id,
      cupom || null,
      parcelasValidadas,
      itemIdsArray
    );

    res.status(201).json({
      mensagem: "Pagamento registrado com sucesso!",
      dados: {
        pagamento_id: result.pagamento_id,
        compra_id: result.compra_id,
        valor_final: result.valorFinal
      }
    });
  } catch (err) {
    console.error(err);
    if (err.sqlMessage && err.sqlMessage.includes('Cupom inválido')) {
      return res.status(400).send(err.sqlMessage);
    }
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
  try {
    const { pagamento_id } = req.params;
    const pagamento = await pagamentoModel.buscarPorId(pagamento_id);
    if (!pagamento) return res.status(404).send("Pagamento não encontrado");
    res.json(pagamento);
  } catch (err) {
    res.status(500).send("Erro ao buscar pagamento: " + err.message);
  }
};

const atualizar = async (req, res) => {
  try {
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

    if (!atualizado) return res.status(500).send("Erro ao atualizar pagamento");

    res.send("Pagamento atualizado com sucesso");
  } catch (err) {
    res.status(500).send("Erro ao atualizar pagamento: " + err.message);
  }
};

const deletar = async (req, res) => {
  try {
    const { pagamento_id } = req.params;
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