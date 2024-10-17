const Pratos = require('../../../models/Pratos');

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

}

module.exports = new PratosServices();