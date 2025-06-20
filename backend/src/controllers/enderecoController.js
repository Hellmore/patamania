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
    res.status(201).send({
        "status": "success",
        "code": 201,
        "message": "Cadastro realizado com sucesso"});
  } catch (error) {
    console.error(error); 
    res.status(500).send("Erro ao cadastrar endereço: " + error.message);
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

const buscarPorUser = async (req, res) => {
  const { usuario_id } = req.params;

  try {
    const result = await enderecoModel.buscarPorUser(usuario_id);
    if (!result) {
      return res.status(200).send({
        "status": "success",
        "code": 200,
        "message": "Nenhum endereço cadastrado para este usuário.",
        "data": null
      });
    }
    res.status(200).json(result);  
  } catch (error) {
    res.status(500).send("Erro ao buscar endereço.");
  }
};

const atualizar = async (req, res) => {
  const { usuario_id } = req.params;
  const updateData = req.body;

  try {
    // Verifica se há dados para atualizar
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ success: false, message: "Nenhum dado fornecido para atualização." });
    }

    // Busca o endereço atual para preencher campos não enviados
    const enderecoAtual = await enderecoModel.buscarPorUser(usuario_id);
    
    if (!enderecoAtual) {
      return res.status(404).json({ success: false, message: "Endereço não encontrado." });
    }

    // Mescla os dados atuais com as atualizações
    const dadosAtualizados = {
      endereco_logradouro: updateData.endereco_logradouro || enderecoAtual.endereco_logradouro,
      endereco_numero: updateData.endereco_numero || enderecoAtual.endereco_numero,
      endereco_complemento: updateData.endereco_complemento || enderecoAtual.endereco_complemento,
      endereco_bairro: updateData.endereco_bairro || enderecoAtual.endereco_bairro,
      endereco_cidade: updateData.endereco_cidade || enderecoAtual.endereco_cidade,
      endereco_estado: updateData.endereco_estado || enderecoAtual.endereco_estado,
      endereco_cep: updateData.endereco_cep || enderecoAtual.endereco_cep
    };

    // Chama o model para atualizar
    await enderecoModel.atualizar(
      usuario_id,
      dadosAtualizados.endereco_logradouro,
      dadosAtualizados.endereco_numero,
      dadosAtualizados.endereco_complemento,
      dadosAtualizados.endereco_bairro,
      dadosAtualizados.endereco_cidade,
      dadosAtualizados.endereco_estado,
      dadosAtualizados.endereco_cep
    );

    res.status(200).json({ success: true, message: "Endereço atualizado com sucesso!" });
  } catch (error) {
    console.error("Erro ao atualizar endereço:", error);
    res.status(500).json({ success: false, message: "Erro interno ao atualizar endereço." });
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
  buscarPorUser,
  atualizar, 
  deletar 
};