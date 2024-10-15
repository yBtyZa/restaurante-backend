const Clientes = require('../../../models/Clientes');
const Restaurantes = require('../../../models/Restaurantes');

class ClientesServices {

    async create(body) {
        try {
            // Verifica se o restaurante passado existe
            const existingRestaurante = await Restaurantes.findOne({ where: { id: body.restaurante_id } });
            if (!existingRestaurante) {
                throw new Error("Restaurante não encontrado");
            }
            // Verifica se o email passado ja existe
            const existingEmail = await Clientes.findOne({ where: { email: body.email } });
            if (existingEmail) {
                throw new Error("Email já cadastrado");
            }
            // Cria o cliente
            const cliente = await Clientes.create(body);
            return cliente;
        } catch (error) {
            // Deixa o controller lidar com o erro
            throw error;
        }
    }
}

module.exports = new ClientesServices();