const Pagamentos = require('../../../models/Pagamentos');
const Pedidos = require('../../../models/Pedidos');
const ItensPedidos = require('../../../models/ItensPedidos');
const Pratos = require('../../../models/Pratos');
const Bebidas = require('../../../models/Bebidas');

class PagamentosServices {

    async create(pedido_id, valor, status) {
        // Inicia a transação
        const transaction = await Pagamentos.sequelize.transaction();
        try {
            // Cria o pagamento
            const result = await Pagamentos.create({ pedido_id, valor, status }, { transaction });

            // Confirma a transação
            await transaction.commit();

            return result;
        } catch (error) {
            // Faz rollback em caso de erro
            await transaction.rollback();
            throw error; // Lance o erro para que possa ser tratado no nível superior
        }
    }

    async listOne(id) {
        // Inicia a transação
        const transaction = await Pagamentos.sequelize.transaction();
        try {
            // Lista um pagamento incluindo o pedido e os itens
            const result = await Pagamentos.findOne({
                where: { id },
                attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                include: [
                    {
                        model: Pedidos,
                        as: 'pedido',
                        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                        include: [
                            {
                                model: ItensPedidos,
                                as: 'itens_pedidos',
                                attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                                include: [
                                    {
                                        model: Pratos,
                                        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                                        as: 'prato',
                                    },
                                    {
                                        model: Bebidas,
                                        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
                                        as: 'bebida',
                                    }
                                ]
                            }
                        ]
                    }
                ],
                transaction
            });

            if (!result) {
                throw new Error('Pagamento não encontrado');
            }

            // Confirma a transação
            await transaction.commit();

            return result;
        } catch (error) {
            // Faz rollback em caso de erro
            await transaction.rollback();
            // Lance o erro para que possa ser tratado no nível superior
            throw error;
        }
    }

}

module.exports = new PagamentosServices()