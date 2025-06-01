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
} else if (!usuario_tipo || usuario_tipo.trim() === '') {
    return res.status(400).send('O tipo de usuário é obrigatório.');
} else if (!usuario_pais || usuario_pais.trim() === '') {
    return res.status(400).send('O país do usuário é obrigatório.');
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
    const { 
        usuario_nome, 
        usuario_email, 
        usuario_senha, 
        usuario_dataNascimento, 
        usuario_tipo, 
        usuario_pais 
    } = req.body;

    try {
        const usuarioExistente = await usuarioModel.buscarPorId(usuario_id);
        if (!usuarioExistente) {
            return res.status(404).send('Usuário não encontrado.');
        }

        const senhaHashada = usuario_senha 
            ? await bcrypt.hash(usuario_senha, 10) 
            : usuarioExistente.usuario_senha;

        const usuarioParaAtualizar = {
            usuario_nome,
            usuario_email,
            usuario_senha: senhaHashada,
            usuario_dataNascimento,
            usuario_tipo,
            usuario_pais
        };

        await usuarioModel.atualizar(usuario_id, usuarioParaAtualizar);
        res.send('Usuário atualizado com sucesso!');
    } catch (err) {
        res.status(500).send('Erro ao atualizar usuário: ' + err.message);
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

const login = async (req, res) => {
    const { usuario_email, usuario_senha } = req.body;

    if (!usuario_email || usuario_email.trim() === '') {
        return res.status(400).send('O e-mail é obrigatório.');
    }
    if (!usuario_senha || usuario_senha.trim() === '') {
        return res.status(400).send('A senha é obrigatória.');
    }

    try {
        const usuario = await usuarioModel.buscarPorEmail(usuario_email);

        if (!usuario) {
            return res.status(404).send('Usuário não encontrado.');
        }

        const senhaCorreta = await bcrypt.compare(usuario_senha, usuario.usuario_senha);

        if (!senhaCorreta) {
            return res.status(401).send('Senha incorreta.');
        }

        res.status(200).send({
            mensagem: 'Login realizado com sucesso!',
            usuario: {
                id: usuario.usuario_id,
                nome: usuario.usuario_nome,
                email: usuario.usuario_email,
                tipo: usuario.usuario_tipo,
                pais: usuario.usuario_pais
            }
        });
    } catch (err) {
        res.status(500).send('Erro ao fazer login: ' + err.message);
    }
};

module.exports = {
    cadastrar,
    listar,
    buscarPorId,
    atualizar,
    excluir,
    login
};