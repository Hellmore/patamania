const usuarioModel = require('../models/usuarioModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const { usuario_email, usuario_senha } = req.body;

    if (!usuario_email || !usuario_senha) {
        return res.status(400).send('E-mail e senha são obrigatórios.');
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

        const payload = {
            id: usuario.usuario_id,
            nome: usuario.usuario_nome,
            email: usuario.usuario_email,
            tipo: usuario.usuario_tipo
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({
            mensagem: 'Login realizado com sucesso!',
            token,
            usuario: payload
        });

    } catch (err) {
        res.status(500).send('Erro ao fazer login: ' + err.message);
    }
};

module.exports = {
    login
};