const Clientes = require('../../../models/Clientes');

class ClientesServices {

    async create(body, token) {
        try {
            // Verifica se o email passado ja existe
            const existingEmail = await Clientes.findOne({ where: { email: body.email } });
            if (existingEmail) {
                throw new Error("Email já cadastrado");
            }
            // Cria o cliente
            const cliente = await Clientes.create({
                ...body,
                restaurante_id: token.restaurante_id
            });
            return cliente;
        } catch (error) {
            // Deixa o controller lidar com o erro
            throw error;
        }
    }
}

module.exports = new ClientesServices();