const jwt = require('jsonwebtoken');

const autenticarToken = (req, res, next) => {
    try {
        // no Postman, é necessário colocar o header Authorization que é: "Bearer <token gerado no login>"
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({message: 'Token não fornecido'});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = {
            id: decoded.id,
        };

        next();
    } catch (error) {
        console.error('Erro na verificação do token: ', error);
        return res.status(403).json({ message: 'Token inválido'});
    }
};

module.exports = autenticarToken;