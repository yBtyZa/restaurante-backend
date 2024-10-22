const { verify } = require("jsonwebtoken");

function validaToken(req, res, next) {
    try{
        const { authorization } = req.headers;
        if(!authorization) {
            return res.status(401).json({ message: "Token ausente!" });
        }

        const token = authorization.split(" ")[1];
        const tokenValido = verify(token, process.env.JWT_SECRET);
        if(!tokenValido) {
            return res.status(401).json({ message: "Token inválido!" });
        }
        req.token = {
            restaurante_id: tokenValido.restaurante_id,
            cliente_id: tokenValido.cliente_id || null,
            permissao: tokenValido.permissao
        }

        next();
    } catch(error) {
        if (error.message === 'invalid token' ||
            error.message === 'jwt malformed' ||
            error.message === 'invalid signature' ||
            error.message === 'jwt expired') {
            return res.status(401).json({ message: 'TokenJWT inválido ou expirado' })
        }
        return res.status(500).json({ message: 'A requisição falhou' })
    }
}

module.exports = validaToken