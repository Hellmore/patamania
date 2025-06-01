const jwt = require('jsonwebtoken');

const autenticarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    // O header Authorization costuma ser "Bearer <token>"
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ mensagem: 'Token não fornecido.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
        if (err) {
            return res.status(403).json({ mensagem: 'Token inválido ou expirado.' });
        }

        // Se o token for válido, guarda os dados do usuário na requisição
        req.usuario = usuario;

        next();
    });
};

module.exports = autenticarToken;