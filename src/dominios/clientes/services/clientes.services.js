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

            // Verifica se o email já existe no restaurante específico
            const existingEmail = await Clientes.findOne({ 
                where: { 
                    email: body.email,
                    restaurante_id: body.restaurante_id // Verifica o email no restaurante
                }
            });
            if (existingEmail) {
                throw new Error("Email já cadastrado para este restaurante");
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
