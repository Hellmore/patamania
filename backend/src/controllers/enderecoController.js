const enderecoModel = require('../models/enderecoModel');

const cadastrar = async (req, res) => {
  const {
    usuario_id,
    endereco_logradouro,
    endereco_numero,
    endereco_complemento,
    endereco_bairro,
    endereco_cidade,
    endereco_estado,
    endereco_cep
  } = req.body;

  if (!usuario_id || !endereco_logradouro || !endereco_numero || !endereco_bairro || !endereco_cidade || !endereco_estado || !endereco_cep) {
    return res.status(400).send("Todos os campos obrigatórios devem ser preenchidos.");
  }

  try {
    await enderecoModel.cadastrar(
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
    res.status(500).send("Erro ao cadastrar endereço.");
  }
};

const listar = async (req, res) => {
  try {
    const result = await enderecoModel.listar();
    res.status(200).json(result);  
  } catch (error) {
    res.status(500).send("Erro ao listar endereços.");
  }
};

const buscarPorId = async (req, res) => {
  const { endereco_id } = req.params;

  try {
    const result = await enderecoModel.buscarPorId(endereco_id);
    if (!result) {
      return res.status(404).send("Endereço não encontrado.");
    }
    res.status(200).json(result);  
  } catch (error) {
    res.status(500).send("Erro ao buscar endereço.");
  }
};

const atualizar = async (req, res) => {
  const { endereco_id } = req.params;
  const {
    endereco_logradouro,
    endereco_numero,
    endereco_complemento,
    endereco_bairro,
    endereco_cidade,
    endereco_estado,
    endereco_cep
  } = req.body;

  if (!endereco_logradouro || !endereco_numero || !endereco_bairro || !endereco_cidade || !endereco_estado || !endereco_cep) {
    return res.status(400).send("Todos os campos obrigatórios devem ser preenchidos.");
  }

  try {
    await enderecoModel.atualizar(
      endereco_id,
      endereco_logradouro,
      endereco_numero,
      endereco_complemento,
      endereco_bairro,
      endereco_cidade,
      endereco_estado,
      endereco_cep
    );
    res.status(200).send("Endereço atualizado com sucesso!");
  } catch (error) {
    res.status(500).send("Erro ao atualizar endereço.");
  }
};

const deletar = async (req, res) => {
  const { endereco_id } = req.params;

  try {
    await enderecoModel.deletar(endereco_id);
    res.status(200).send("Endereço deletado com sucesso!");
  } catch (error) {
    res.status(500).send("Erro ao deletar endereço.");
  }
};

module.exports = { 
  cadastrar, 
  listar, 
  buscarPorId, 
  atualizar, 
  deletar 
};