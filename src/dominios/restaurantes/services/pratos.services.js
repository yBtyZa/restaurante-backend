const Pratos = require('../../../models/Pratos');
const { Op } = require('sequelize');

class PratosServices {

    async create(body, token) {
        // Inicia a transação
        const transaction = await Pratos.sequelize.transaction();

        try {
            // Verifica se o prato ja existe
            const existingPrato = await Pratos.findOne({ where: { nome: body.nome }, transaction });
            if (existingPrato) {
                throw new Error("Prato já cadastrado");
            }
            // Cria o prato
            const prato = await Pratos.create({
                ...body,
                restaurante_id: token.restaurante_id
            }, { transaction });

            // Confirma a transação
            await transaction.commit();

            return prato;
        } catch (error) {
            // Faz rollback em caso de erro
            await transaction.rollback();

            // Deixa o controller lidar com o erro
            throw error;
        }
    }

    async update(prato_id, { nome, descricao, preco }) {
        // Inicia a transação
        const transaction = await Pratos.sequelize.transaction();

        try {
            // Verifica se o prato com o ID fornecido existe
            const prato = await Pratos.findByPk(prato_id, { transaction });
            if (!prato) {
                throw new Error("Prato não encontrado");
            }

            // Verifica se já existe outro prato com o mesmo nome
            const existingPrato = await Pratos.findOne({ where: { nome, id: { [Op.ne]: prato_id } }, transaction });
            if (existingPrato) {
                throw new Error("Prato já cadastrado");
            }

            // Atualiza o prato
            await Pratos.update({ nome, descricao, preco }, { where: { id: prato_id } }, transaction);

            // Confirma a transação
            await transaction.commit();

            return { message: "Prato atualizado com sucesso" };
        } catch (error) {
            // Faz rollback em caso de erro
            await transaction.rollback();

            // Deixa o controller lidar com o erro
            throw error;
        }
    }

    async delete(prato_id) {
        // Inicia a transação
        const transaction = await Pratos.sequelize.transaction();

        try {
            // Verifica se o prato existe
            const existingPrato = await Pratos.findOne({ where: { id: prato_id }, transaction });
            if (!existingPrato) {
                throw new Error("Prato não encontrado");
            }

            // Deleta o prato
            await Pratos.destroy({ where: { id: prato_id } }, transaction);

            // Confirma a transação
            await transaction.commit();

            return { message: "Prato excluído com sucesso" };
        } catch (error) {
            // Faz rollback em caso de erro
            await transaction.rollback();

            // Deixa o controller lidar com o erro
            throw error;
        }
    }

    async listAll(id) {
        try {
            // Lista todos os pratos
            const pratos = await Pratos.findAll({ where: { restaurante_id: id }, attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] } });

            // Verifica se existe algum prato
            if (pratos.length === 0) {
                throw new Error("Nenhum prato encontrado");
            }

            return pratos;
        } catch (error) {
            // Deixa o controller lidar com o erro
            throw error;
        }
    }

    async listOne(id, prato_id) {
        try {
            // Lista um prato
            const prato = await Pratos.findOne({ where: { restaurante_id: id, id: prato_id }, attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] } });

            // Verifica se o prato existe
            if (!prato) {
                throw new Error("Prato não encontrado");
            }

            return prato;
        } catch (error) {
            // Deixa o controller lidar com o erro
            throw error;
        }
    }
}

module.exports = new PratosServices();