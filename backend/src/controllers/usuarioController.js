const usuarioModel = require('../models/usuarioModel');
const bcrypt = require('bcryptjs');

const cadastrar = async (req, res) => {
    console.log(req.body);

    const { 
        usuario_nome, 
        usuario_email, 
        usuario_senha, 
        usuario_dataNascimento, 
        usuario_tipo, 
        usuario_pais 
    } = req.body;

if (!usuario_nome || usuario_nome.trim() === '') {
    return res.status(400).send('O nome do usuário é obrigatório.');
} else if (!usuario_email || usuario_email.trim() === '') {
    return res.status(400).send('O e-mail do usuário é obrigatório.');
} else if (!usuario_senha || usuario_senha.trim() === '') {
    return res.status(400).send('A senha do usuário é obrigatória.');
} else if (!usuario_dataNascimento || usuario_dataNascimento.trim() === '') {
    return res.status(400).send('A data de nascimento é obrigatória.');
// } else if (!usuario_tipo || usuario_tipo.trim() === '') {
    // return res.status(400).send('O tipo de usuário é obrigatório.');
// } else if (!usuario_pais || usuario_pais.trim() === '') {
    // return res.status(400).send('O país do usuário é obrigatório.');
}


    try {
        const salt = await bcrypt.genSalt(10);  
        const senhaHashada = await bcrypt.hash(usuario_senha, salt); 
        
        const usuario_dataInscricao = new Date().toISOString().split('T')[0]; // yyyy-mm-dd

        const usuarioParaSalvar = {
            usuario_nome,
            usuario_email,
            usuario_senha: senhaHashada,
            usuario_dataNascimento,
            usuario_tipo,
            usuario_pais,
            usuario_dataInscricao
        };

        await usuarioModel.cadastrar(usuarioParaSalvar);

        res.status(201).send('Usuário cadastrado com sucesso!');
    } catch (err) {
        res.status(500).send('Erro ao cadastrar usuário: ' + err.message);
    }
};

const listar = async (req, res) => {
    try {
        const usuarios = await usuarioModel.listarTodos();
        res.json(usuarios);
    } catch (err) {
        res.status(500).send('Erro ao listar usuários: ' + err.message);
    }
};

const buscarPorId = async (req, res) => {
    const { usuario_id } = req.params;
    try {
        const usuario = await usuarioModel.buscarPorId(usuario_id);
        if (!usuario) {
            return res.status(404).send('Usuário não encontrado.');
        }

        res.json(usuario);
    } catch (err) {
        res.status(500).send('Erro ao buscar usuário: ' + err.message);
    }
};

const atualizar = async (req, res) => {
  const { usuario_id } = req.params;
  
  console.log('Dados recebidos:', req.body); // Log para debug

  try {
    const usuarioExistente = await usuarioModel.buscarPorId(usuario_id);
    if (!usuarioExistente) {
      return res.status(404).json({ success: false, message: 'Usuário não encontrado.' });
    }

    // Preparar dados para atualização
    const updates = {};
    
    if (req.body.usuario_nome) updates.usuario_nome = req.body.usuario_nome;
    if (req.body.usuario_email) updates.usuario_email = req.body.usuario_email;
    if (req.body.usuario_pais) updates.usuario_pais = req.body.usuario_pais;
    
    // Tratamento especial para data
    if (req.body.usuario_dataNascimento) {
      updates.usuario_dataNascimento = new Date(req.body.usuario_dataNascimento);
    }
    
    // Tratamento especial para senha
    if (req.body.usuario_senha && req.body.usuario_senha !== '********') {
      updates.usuario_senha = await bcrypt.hash(req.body.usuario_senha, 10);
    }

    // Verifica se há algo para atualizar
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ success: false, message: 'Nenhum dado para atualizar' });
    }

    // Executa a atualização
    const result = await usuarioModel.atualizar(usuario_id, updates);
    
    if (result.affectedRows === 0) {
      return res.status(500).json({ success: false, message: 'Nenhuma linha afetada' });
    }

    res.json({ 
      success: true,
      message: 'Usuário atualizado com sucesso!',
      changes: updates
    });
    
  } catch (err) {
    console.error('Erro detalhado:', err);
    res.status(500).json({ 
      success: false,
      message: 'Erro ao atualizar usuário',
      error: err.message
    });
  }
};

const excluir = async (req, res) => {
    const { usuario_id } = req.params;
    try {
        const usuarioExistente = await usuarioModel.buscarPorId(usuario_id);
        if (!usuarioExistente) {
            return res.status(404).send('Usuário não encontrado.');
        }

        await usuarioModel.excluir(usuario_id);
        res.send('Usuário excluído com sucesso!');
    } catch (err) {
        res.status(500).send('Erro ao excluir usuário: ' + err.message);
    }
};

module.exports = {
    cadastrar,
    listar,
    buscarPorId,
    atualizar,
    excluir,
};