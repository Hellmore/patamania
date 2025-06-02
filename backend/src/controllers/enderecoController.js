const enderecoModel = require('../models/enderecoModel');

const cadastrar = async (req, res) => {
  const {
    endereco_id,
    usuario_id,
    endereco_logradouro,
    endereco_numero,
    endereco_complemento,
    endereco_bairro,
    endereco_cidade,
    endereco_estado,
    endereco_cep
  } = req.body;

  if (!endereco_id || !usuario_id || !endereco_logradouro || !endereco_numero || !endereco_bairro || !endereco_cidade || !endereco_estado || !endereco_cep) {
    return res.status(400).send("Todos os campos obrigatórios devem ser preenchidos.");
  }

  try {
    await enderecoModel.cadastrar(
      endereco_id,
      usuario_id,
      endereco_logradouro,
      endereco_numero,
      endereco_complemento,
      endereco_bairro,
      endereco_cidade,
      endereco_estado,
      endereco_cep
    );
    res.status(201).send("Endereço cadastrado com sucesso!");
  } catch (error) {
    res.status(500).send("Erro ao cadastrar endereço: " + error.message);
  }
};

module.exports = { cadastrar };