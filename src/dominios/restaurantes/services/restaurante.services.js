const Restaurantes = require('../../../models/Restaurantes');

class RestauranteServices {
    async create({ nome, email, senha }) {
        try {
            // Verifica se o email passado ja existe
            const existingRestaurante = await Restaurantes.findOne({ where: { email } });
            if (existingRestaurante) {
                throw new Error("Email já cadastrado");
            }

            // Cria o restaurante
            const restaurante = await Restaurantes.create({ nome, email, senha });
            return restaurante;
        } catch (error) {
            throw error;  // Deixa o controller lidar com o erro
        }
    }
}

module.exports = new RestauranteServices();
