const Pedidos = require('../../../models/Pedidos');

class PedidosServices {

    async create(body, token) {
        console.log(body, token);
        try {
            const pedido = await Pedidos.create({
                ...body,
                cliente_id: token.cliente_id,
                restaurante_id: token.restaurante_id
            });
            console.log(pedido);
            return pedido;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new PedidosServices()