const animalModel = require('../models/animalModel');

const cadastrar = async (req, res) => {
    const {
        animal_nome,
        animal_dataNascimento,
        animal_raca,
        animal_porte,
        animal_descricao,
        animal_pelagem,
        usuario_id
    } = req.body;

    if (!animal_nome || !animal_dataNascimento || !animal_raca || !animal_porte || !animal_descricao || !animal_pelagem || !usuario_id) {
        return res.status(400).send("Todos os campos obrigatórios devem ser preenchidos.");
    }

    try {
        await animalModel.cadastrar(animal_nome, animal_dataNascimento, animal_raca, animal_porte, animal_descricao, animal_pelagem, usuario_id);
        res.status(201).send("Animal cadastrado com sucesso!");
    } catch (error) {
        res.status(500).send("Erro ao cadastrar animal: " + error.message);
    }
};

const listarTodos = async (req, res) => {
    try {
        const animais = await animalModel.listarTodos();
        res.json(animais);
    } catch (error) {
        res.status(500).send("Erro ao listar animais: " + error.message);
    }
};

const buscarPorId = async (req, res) => {
    const animal_id = req.params.animal_id;

    try {
        const animal = await animalModel.buscarPorId(animal_id);
        if (!animal) {
            return res.status(404).send("Animal não encontrado.");
        }
        res.json(animal);
    } catch (error) {
        res.status(500).send("Erro ao buscar animal: " + error.message);
    }
};

const atualizar = async (req, res) => {
    const animal_id = req.params.animal_id;
    const {
        animal_nome,
        animal_dataNascimento,
        animal_raca,
        animal_porte,
        animal_descricao,
        animal_pelagem
    } = req.body;

    if (!animal_nome || !animal_dataNascimento || !animal_raca || !animal_porte || !animal_descricao || !animal_pelagem) {
        return res.status(400).send("Todos os campos obrigatórios devem ser preenchidos.");
    }

    try {
        const atualizado = await animalModel.atualizar(animal_id, animal_nome, animal_dataNascimento, animal_raca, animal_porte, animal_descricao, animal_pelagem);
        if (!atualizado) {
            return res.status(404).send("Animal não encontrado para atualização.");
        }
        res.send("Animal atualizado com sucesso!");
    } catch (error) {
        res.status(500).send("Erro ao atualizar animal: " + error.message);
    }
};

const deletar = async (req, res) => {
    const animal_id = req.params.animal_id;

    try {
        const deletado = await animalModel.deletar(animal_id);
        if (!deletado) {
            return res.status(404).send("Animal não encontrado para exclusão.");
        }
        res.send("Animal deletado com sucesso!");
    } catch (error) {
        res.status(500).send("Erro ao deletar animal: " + error.message);
    }
};

const listarPorUsuario = async (req, res) => {
  const { usuario_id } = req.params;

  try {
    const animais = await animalModel.listarPorUsuario(usuario_id);
    res.json(animais);
  } catch (error) {
    res.status(500).send("Erro ao listar animais por usuário: " + error.message);
  }
};

module.exports = {
    cadastrar,
    listarTodos,
    buscarPorId,
    atualizar,
    deletar,
    listarPorUsuario
};