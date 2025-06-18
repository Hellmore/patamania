const jwt = require('jsonwebtoken');

const autenticarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    // no Postman, é necessário colocar o header Authorization que é: "Bearer <token gerado no login>"
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ mensagem: 'Token não fornecido.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
        if (err) {
            return res.status(403).json({ mensagem: 'Token inválido ou expirado.' });
        }

        // se o token for válido, guarda os dados do usuário na requisição
        req.usuario = usuario;

        next();
    });
};

module.exports = autenticarToken;