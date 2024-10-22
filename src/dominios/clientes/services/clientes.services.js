const Clientes = require('../../../models/Clientes');
const Restaurantes = require('../../../models/Restaurantes');

const { hashSync } = require('bcryptjs');

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

    async update(cliente_id, restaurante_id, { nome, telefone, email, endereco, senha }) {
        // Inicia a transação
        const transaction = await Clientes.sequelize.transaction();
        try {
            // Verifica se o email passado ja existe
            if (email) {
                // Procura um cliente com o mesmo email, mas pertence ao mesmo restaurante
                const existingCliente = await Clientes.findOne({ where: { email, restaurante_id }, transaction });
    
                // Se o email já existe e pertence ao mesmo restaurante, lança um erro
                if (existingCliente && existingCliente.id !== cliente_id) {
                    throw new Error("Email já cadastrado para este restaurante");
                }
            }
            // Se uma senha nova foi fornecida, faz o hash
            if (senha) {
                senha = hashSync(senha, 10);
            }
            await Clientes.update({ nome, telefone, email, endereco, senha }, { where: { id: cliente_id }, transaction });
            // Confirma a transação
            await transaction.commit();

            return {
                message: "Cliente atualizado com sucesso"
            };
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
