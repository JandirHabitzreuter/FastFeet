const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const authConfig = require('../../config/auth');

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Token not provided' });
    }

    // pegar somente o Token do headers, pois no headers vai vir o Token mas antes de espaço
    const [, token] = authHeader.split(' ');

    try {
        // decodificar o token (pegar o ID)
        const decoded = await promisify(jwt.verify)(token, authConfig.secret);
        req.userId = decoded.id;
        return next();
    } catch (err) {
        return res.status(401).json({ error: 'Token invalid' });
    }
};
