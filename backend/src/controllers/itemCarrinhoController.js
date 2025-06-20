const itemCarrinhoModel = require('../models/itemCarrinhoModel');

const cadastrar = async (req, res) => {
    const { 
        carrinho_id,
        produto_id,
        item_quantidade,
        item_preco_unitario 
    } = req.body;
    if (
        !carrinho_id ||
        !produto_id ||
        !item_quantidade ||
        !item_preco_unitario 
    ) {
        return res.status(400).send("Todos os campos de Item Carrinho são obrigatórios!");
    }
    try {
        await itemCarrinhoModel.cadastrar(        
            carrinho_id,
            produto_id,
            item_quantidade,
            item_preco_unitario 
        );
        res.status(201).send("Item adicionado ao carrinho com sucesso");
    } catch (err) {
        res.status(500).send("Erro ao adicionar item: " + err.message);
    }
};

const listarTodos = async (req, res) => {
    try {
        const itens = await itemCarrinhoModel.listarTodos();
        res.json(itens);
    } catch (err) {
        res.status(500).send("Erro ao listar itens: " + err.message);
    }
};

const buscarPorUsuario = async (req, res) => {
  const { usuario_id } = req.params;

  try {
    const itens = await itemCarrinhoModel.buscarPorUsuario(usuario_id);
    res.json(itens);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao buscar itens do carrinho');
  }
};

const buscarPorId = async (req, res) => {
    const { item_id } = req.params;
    try {
        const item = await itemCarrinhoModel.buscarPorId(item_id);
        if (!item) return res.status(404).send("Item não encontrado");
        res.json(item);
    } catch (err) {
        res.status(500).send("Erro ao buscar item: " + err.message);
    }
};

const atualizar = async (req, res) => {
    const { item_id } = req.params;
    const { carrinho_id, produto_id, item_quantidade, item_preco_unitario } = req.body;

    if (!carrinho_id || !produto_id || !item_quantidade || !item_preco_unitario) {
        return res.status(400).send("Todos os campos de Item Carrinho são obrigatórios!");
    }

    try {
        const existe = await itemCarrinhoModel.buscarPorId(item_id);
        if (!existe || existe.length === 0) return res.status(404).send("Item não encontrado");

        await itemCarrinhoModel.atualizar(
            item_id,
            carrinho_id,
            produto_id,
            item_quantidade,
            item_preco_unitario
        );
        res.send("Item atualizado com sucesso");
    } catch (err) {
        res.status(500).send("Erro ao atualizar item: " + err.message);
    }
};

const deletar = async (req, res) => {
    const { item_id } = req.params;
    try {
        const existe = await itemCarrinhoModel.buscarPorId(item_id);
        if (!existe) return res.status(404).send("Item não encontrado");
        await itemCarrinhoModel.deletar(item_id);
        res.send("Item removido do carrinho com sucesso");
    } catch (err) {
        res.status(500).send("Erro ao remover item: " + err.message);
    }
};

module.exports = {
    cadastrar,
    listarTodos,
    buscarPorId,
    atualizar,
    deletar,
    buscarPorUsuario
};
