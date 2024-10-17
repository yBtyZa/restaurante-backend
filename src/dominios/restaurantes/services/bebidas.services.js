const Bebidas = require('../../../models/Bebidas');

class BebidasServices {

    async create(body, token) {
        // Inicia a transação
        const transaction = await Bebidas.sequelize.transaction();

        try {
            // Verifica se a bebida ja existe
            const existingBebida = await Bebidas.findOne({ where: { nome: body.nome }, transaction });
            if (existingBebida) {
                throw new Error("Bebida já cadastrado");
            }
            // Cria a bebida
            const bebida = await Bebidas.create({
                ...body,
                restaurante_id: token.restaurante_id
            }, { transaction });

            // Confirma a transação
            await transaction.commit();

            return bebida;
        } catch (error) {
            // Faz rollback em caso de erro
            await transaction.rollback();
            
            // Deixa o controller lidar com o erro
            throw error;
        }
    }

}

module.exports = new BebidasServices();