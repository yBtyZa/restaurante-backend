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

    async listAll(restaurante_id){
        try {
            // Lista todos os clientes
            const clientes = await Clientes.findAll({ 
                where: { restaurante_id },
                attributes: { exclude: ['senha', 'permissao', 'createdAt', 'updatedAt', 'deletedAt'] }
             });

            // Verifica se existe algum cliente
            if (clientes.length === 0) {
                throw new Error("Nenhum cliente encontrado");
            }
            return clientes;
        } catch (error) {
            // Deixa o controller lidar com o erro
            throw error;
        }
        
    }

    async listOne(id) {
        try {
            // Lista um cliente
            const cliente = await Clientes.findOne({ 
                where: { id },
                attributes: { exclude: ['senha', 'permissao', 'createdAt', 'updatedAt', 'deletedAt'] }
             });

            // Verifica se o cliente existe
            if (!cliente) {
                throw new Error("Cliente não encontrado");
            }

            return cliente;
        } catch (error) {
            // Deixa o controller lidar com o erro
            throw error;
        }
    }
}

module.exports = new ClientesServices();
