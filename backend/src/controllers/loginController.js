const usuarioModel = require('../models/usuarioModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const { usuario_email, usuario_senha } = req.body;
    
    //----------------------
    const JWT_SECRET = process.env.JWT_SECRET;

    if (!JWT_SECRET) {
    throw new Error('❌ JWT_SECRET não definido! Verifique seu arquivo .env');
    }

    module.exports = {
    JWT_SECRET
    };
    //----------------------
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

        const token = jwt.sign(
            payload, 
            JWT_SECRET, { 
                expiresIn: '1h' 
        });

        res.json({ token });

        console.log('Token gerado:', token); // Log do token gerado

        const refreshToken = jwt.sign(
            { id: usuario.usuario_id },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: '7d' }
        );

        // Armazene o refresh token no banco de dados
        await usuarioModel.atualizarRefreshToken(usuario.usuario_id, refreshToken);

        res.status(200).json({
            mensagem: 'Login realizado com sucesso!',
            token,
            usuario: payload
        });

    // } catch (err) {
    //     console.error('Erro detalhado:', err); // Log mais informativo
    //     res.status(500).json({ 
    //     error: 'Erro no servidor',
    //     details: process.env.NODE_ENV === 'development' ? err.message : undefined
    //     });
           } catch (err) {
            console.error('Erro REAL:', err);
            res.status(500).send('Erro crítico: ' + err.message);
        }
        };
    // }

// };

module.exports = {
    login
};