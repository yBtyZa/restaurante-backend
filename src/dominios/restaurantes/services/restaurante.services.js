const Restaurantes = require('../../../models/Restaurantes');
const { hashSync } = require('bcryptjs');

class RestauranteServices {
    async create({ nome, email, senha }) {
        // Inicia a transação
        const transaction = await Restaurantes.sequelize.transaction();

        try {
            // Verifica se o email passado ja existe
            const existingRestaurante = await Restaurantes.findOne({ where: { email }, transaction });
            if (existingRestaurante) {
                throw new Error("Email já cadastrado");
            }

            // Cria o restaurante
            const restaurante = await Restaurantes.create({ nome, email, senha }, { transaction });

            // Confirma a transação
            await transaction.commit();

            return restaurante;
        } catch (error) {
            // Faz rollback em caso de erro
            await transaction.rollback();

            // Deixa o controller lidar com o erro
            throw error;
        }
    }

    async listLogged(restaurante_id) {
        try {
            // Lista o restaurante logado
            const restaurante = await Restaurantes.findOne({
                where: { id: restaurante_id },
                attributes: { exclude: ['permissao', 'createdAt', 'updatedAt', 'deletedAt'] }
            });
            console.log(restaurante)
            // Verifica se o restaurante existe
            if (!restaurante) {
                throw new Error("Restaurante não encontrado");
            }

            return restaurante;
        } catch (error) {
            // Deixa o controller lidar com o erro
            throw error;
        }
    }

    async update(restaurante_id, { email, nome, senha }) {
        // Inicia a transação
        const transaction = await Restaurantes.sequelize.transaction();
        try {
            // Verifica se o email passado ja existe
            if (email) {
                // Procura um restaurante com o mesmo email
                const existingRestaurante = await Restaurantes.findOne({ where: { email }, transaction });
    
                // Se o email já existe e pertence a outro restaurante, lança um erro
                if (existingRestaurante && existingRestaurante.id !== restaurante_id) {
                    throw new Error("Email já cadastrado por outro restaurante");
                }
            }
            // Se uma senha nova foi fornecida, faz o hash
            if (senha) {
                senha = hashSync(senha, 10);
            }
            await Restaurantes.update({ email, nome, senha }, { where: { id: restaurante_id }, transaction });
            // Confirma a transação
            await transaction.commit();

            return {
                message: "Restaurante atualizado com sucesso"
            };
        } catch (error) {
            // Faz rollback em caso de erro
            await transaction.rollback();

            // Deixa o controller lidar com o erro
            throw error;
        }
    }

    async listOne(id) {
        try {
            // Lista um restaurante
            const restaurante = await Restaurantes.findOne({
                where: { id },
                attributes: { exclude: ['email', 'senha', 'permissao', 'createdAt', 'updatedAt', 'deletedAt'] }
            });
            // Verifica se o restaurante existe
            if (!restaurante) {
                throw new Error("Restaurante não encontrado");
            }

            return restaurante;
        } catch (error) {
            // Deixa o controller lidar com o erro
            throw error;
        }
    }

    async listAll() {
        try {
            // Lista todos os restaurantes
            const restaurantes = await Restaurantes.findAll({
                attributes: { exclude: ['email', 'senha', 'permissao', 'createdAt', 'updatedAt', 'deletedAt'] }
            });

            // Verifica se existe algum restaurante
            if (!restaurantes) {
                throw new Error("Nenhum restaurante encontrado");
            }

            return restaurantes;
        } catch (error) {
            // Deixa o controller lidar com o erro
            throw error;
        }
    }
}

module.exports = new RestauranteServices();
