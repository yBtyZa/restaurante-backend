const Restaurante = require('../../../models/Restaurantes');
const { compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');

class AuthRestauranteServices {

    async login({ email, senha }) {
        try {
            // Verifica se o email passado existe
            const restaurante = await Restaurante.findOne({ where: { email } });
            if (!restaurante) {
                throw new Error("Email não encontrado");
            }

            // Verifica se a senha passada confere
            const passwordMatch = await compare(senha, restaurante.senha);
            if (!passwordMatch) {
                throw new Error("Senha inválida");
            }

            // Cria o token
            const token = sign({ restaurante_id: restaurante.id, permissao: restaurante.permissao }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN,
            });

            return {token: token};
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new AuthRestauranteServices();
