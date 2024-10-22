function controlePermissao(permissoesRequeridas) {
    return async (req, res, next) => {
        try {
            const { permissao } = req.token;
            if (!permissoesRequeridas.includes(permissao)) {
                return res.status(403).json({ message: 'Você não tem permissão para acessar essa rota' });
            }

            next()
        } catch (error) {
            return res.status(500).json({ message: 'Erro no servidor. Por favor, tente novamente.' });
        }
    }
}

module.exports = controlePermissao