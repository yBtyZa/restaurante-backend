const PedidosServices = require('../services/pedidos.services');
const schema = require('../../../validations/schemaPedidos');
const Yup = require('yup');

class PedidosController {

    async create(req, res) {
        const { body, token } = req;
        try {
            // Valida o body da requisição com o esquema Yup
            await schema.validate(body, { abortEarly: false });

            // Cria o pedido se a validação passar
            const pedido = await PedidosServices.create(body, token);
            return res.status(201).json(pedido);
        } catch (error) {
            // Verifica se o erro é de validação do Yup
            if (error instanceof Yup.ValidationError) {
                return res.status(400).json({ message: error.errors });
            }
            return res.status(500).json({ message: "Erro no servidor. Por favor, tente novamente." });
        }
    }
}

module.exports = new PedidosController()