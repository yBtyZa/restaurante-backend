const Clientes = require('../../../models/Clientes');
const Restaurantes = require('../../../models/Restaurantes');

class ClientesServices {

    async create(body) {
        // Inicia a transação
        const transaction = await Clientes.sequelize.transaction();

        try {
            // Verifica se o restaurante passado existe
            const existingRestaurante = await Restaurantes.findOne({ where: { id: body.restaurante_id }, transaction });
            if (!existingRestaurante) {
                throw new Error("Restaurante não encontrado");
            }

            // Verifica se o email já existe no restaurante específico
            const existingEmail = await Clientes.findOne({
                where: {
                    email: body.email,
                    restaurante_id: body.restaurante_id // Verifica o email no restaurante
                },
                transaction
            });
            if (existingEmail) {
                throw new Error("Email já cadastrado para este restaurante");
            }

            // Cria o cliente
            const cliente = await Clientes.create(body, { transaction });

            // Confirma a transação
            await transaction.commit();

            return cliente;
        } catch (error) {
            // Faz rollback em caso de erro
            await transaction.rollback();

            // Deixa o controller lidar com o erro
            throw error;
        }
    }
}

module.exports = new ClientesServices();
