const Pedidos = require('../../../models/Pedidos');

class PedidosServices {

    async create(body, token) {
        const transaction = await Pedidos.sequelize.transaction();
        try {
            // Cria o pedido
            const pedido = await Pedidos.create({
                ...body,
                cliente_id: token.cliente_id,
                restaurante_id: token.restaurante_id
            }, { transaction });

            // Confirma a transação
            await transaction.commit();

            return pedido;
        } catch (error) {
            // Faz rollback em caso de erro
            await transaction.rollback();

            // Deixa o controller lidar com o erro
            throw error;
        }
    }
}

module.exports = new PedidosServices()