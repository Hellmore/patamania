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

        const JWT_SECRET = process.env.JWT_SECRET;
        const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

        if (!JWT_SECRET) {
            throw new Error('JWT_SECRET não está configurado');
        }

        const token = jwt.sign(
            payload, 
            JWT_SECRET, { 
                expiresIn: '1h' 
        });

        console.log('🔑 JWT_SECRET na hora do uso:', process.env.JWT_SECRET);

                
        const refreshToken = jwt.sign(
            { id: usuario.usuario_id },
            JWT_REFRESH_SECRET, { 
                expiresIn: '7d' 
        });
        
        await usuarioModel.atualizarRefreshToken(usuario.usuario_id, refreshToken);

        res.status(200).json({
            mensagem: 'Login realizado com sucesso!',
            token,
            refreshToken,
            usuario: payload
        });

        } catch (err) {
            console.error('Erro detalhado:', err); // Log mais informativo
            res.status(500).json({ 
            error: 'Erro no servidor',
            details: process.env.NODE_ENV === 'development' ? err.message : undefined
            });
        }
    };

module.exports = {
    login
};