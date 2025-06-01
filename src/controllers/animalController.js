const animalModel = require('../models/animalModel');

const cadastrar = async (req, res) => {
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
        await animalModel.cadastrar(animal_nome, animal_dataNascimento, animal_raca, animal_porte, animal_descricao, animal_pelagem);
        res.status(201).send("Animal cadastrado com sucesso!");
    } catch (error) {
        res.status(500).send("Erro ao cadastrar animal: " + error.message);
    }
};

module.exports = {
    cadastrar,
};