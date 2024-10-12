const Restaurantes = require('../models/Restaurantes');

class RestauranteController {
    async create(req, res) {
        try {
            const { nome, email, senha } = req.body;
            const restaurante = await Restaurantes.create({ nome, email, senha });
            return res.status(201).json(restaurante);
        } catch (error) {
            return res.status(400).json({ mensage: "Erro ao criar restaurante" });
        }
    }
}

module.exports = new RestauranteController();