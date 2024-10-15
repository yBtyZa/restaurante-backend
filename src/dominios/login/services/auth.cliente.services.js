const Cliente = require('../../../models/Clientes');
const { compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');

class AuthClienteServices {

    async login({ email, senha }) {
        try {
            // Verifica se o email passado existe
            const cliente = await Cliente.findOne({ where: { email } });
            if (!cliente) {
                throw new Error("Email não encontrado");
            }

            // Verifica se a senha passada confere
            const passwordMatch = await compare(senha, cliente.senha);
            if (!passwordMatch) {
                throw new Error("Senha inválida");
            }

            // Cria o token
            const token = sign({ cliente_id: cliente.id, restaurante_id: cliente.restaurante_id }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN,
            });

            return {token: token};
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new AuthClienteServices();
