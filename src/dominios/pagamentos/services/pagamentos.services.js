const Pagamentos = require('../../../models/Pagamentos');

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

    async list() {
        try {

        } catch (error) {
            return error
        }
    }

}

module.exports = new PagamentosServices()