const Pedidos = require('../../../models/Pedidos');
const Pratos = require('../../../models/Pratos');
const Bebidas = require('../../../models/Bebidas');

const ItensPedidos = require('../../../models/ItensPedidos');
const PagamentosServices = require('../../pagamentos/services/pagamentos.services');

class PedidosServices {
    async create(body, token) {
        const transaction = await Pedidos.sequelize.transaction();
        try {
            // Cria o pedido
            const pedido = await Pedidos.create({
                entrega: body.entrega,
                pagamento: body.pagamento,
                observacao: body.observacao,
                cliente_id: token.cliente_id,
                restaurante_id: token.restaurante_id
            }, { transaction });

            // Verifica se todos os pratos passados existem
            const existingPratos = await Promise.all(
                body.pratos_id.map(prato_id =>
                    Pratos.findOne({ where: { id: prato_id }, transaction })
                )
            );

            // Verifica se algum prato não foi encontrado
            const missingPratos = body.pratos_id.filter((prato_id, index) => !existingPratos[index]);
            if (missingPratos.length > 0) {
                throw new Error(`Os seguintes pratos não foram encontrados: ${missingPratos.join(', ')}`);
            }

            // Adiciona os pratos ao pedido
            await Promise.all(existingPratos.map(prato => {
                if (prato) {
                    return pedido.addPratos(prato.id, { transaction });
                }
            }));

            // Verifica se todas as bebidas passadas existem
            const existingBebidas = await Promise.all(
                body.bebidas_id.map(bebida_id =>
                    Bebidas.findOne({ where: { id: bebida_id }, transaction })
                )
            );

            // Verifica se alguma bebida não foi encontrada
            const missingBebidas = body.bebidas_id.filter((bebida_id, index) => !existingBebidas[index]);
            if (missingBebidas.length > 0) {
                throw new Error(`As seguintes bebidas não foram encontradas: ${missingBebidas.join(', ')}`);
            }

            // Adiciona as bebidas ao pedido
            await Promise.all(existingBebidas.map(bebida => {
                if (bebida) {
                    return pedido.addBebidas(bebida.id, { transaction });
                }
            }));

            // Buscar itens do pedido e calcular o valor total
            const itensPedido = await ItensPedidos.findAll({
                where: { pedido_id: pedido.id },
                include: [
                    { model: Pratos, as: 'prato' },
                    { model: Bebidas, as: 'bebida' }
                ],
                transaction
            });

            // Confirma a transação
            await transaction.commit();

            // Calcular o total somando o preço dos pratos e bebidas
            const total = itensPedido.reduce((acc, item) => {
                const pratoPreco = item.prato ? parseFloat(item.prato.preco) : 0;
                const bebidaPreco = item.bebida ? parseFloat(item.bebida.preco) : 0;
                return acc + pratoPreco + bebidaPreco;
            }, 0);

            // Formatar o total para duas casas decimais
            const totalFormatado = parseFloat(total.toFixed(2));

            // Cria o pagamento
            await PagamentosServices.create(pedido.id, totalFormatado, 'Pendente');

            return pedido;
        } catch (error) {
            // Faz rollback em caso de erro
            await transaction.rollback();
            throw error; // Deixa o controller lidar com o erro
        }
    }
}

module.exports = new PedidosServices();
