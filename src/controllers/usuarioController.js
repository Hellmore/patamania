const usuarioModel = require('../models/usuarioModel');
const bcrypt = require('bcryptjs');

const cadastrar = async (req, res) => {
    console.log(req.body)

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
    } else if (!usuario_tipo || usuario_tipo.trim() === '') {
        return res.status(400).send('O tipo de usuário é obrigatório.');
    } else if (!usuario_pais || usuario_pais.trim() === '') {
        return res.status(400).send('O país do usuário é obrigatório.');
    }

    try {
        const salt = await bcrypt.genSalt(10);  
        const senhaHashada = await bcrypt.hash(usuario_senha, salt); 
        await usuarioModel.cadastrar(
            usuario_nome, 
            usuario_email, 
            senhaHashada,  
            usuario_dataNascimento, 
            usuario_tipo, 
            usuario_pais
        );

        res.status(201).send('Usuário cadastrado com sucesso!');
    } catch (err) {
        res.status(500).send('Erro ao cadastrar usuário: ' + err.message);
    }
};

module.exports = {
    cadastrarUsuario: cadastrar,
};