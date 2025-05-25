const animalModel = require('../models/animalModel');

const cadastrar = async (req, res) => {
    const {
        usuario_id,
        animal_nome,
        animal_dataNascimento,
        animal_raca,
        animal_porte,
        animal_descricao,
        animal_pelagem
    } = req.body;

    if (!usuario_id || !animal_nome || !animal_dataNascimento || !animal_raca || !animal_porte || !animal_descricao || !animal_pelagem) {
        return res.status(400).send("Todos os campos são obrigatórios.");
    }

    try {
        await animalModel.cadastrar(usuario_id, animal_nome, animal_dataNascimento, animal_raca, animal_porte, animal_descricao, animal_pelagem);
        res.status(201).send("Animal cadastrado com sucesso!");
    } catch (error) {
        res.status(500).send("Erro ao cadastrar animal: " + error.message);
    }
};

module.exports = {
    cadastrar,
};