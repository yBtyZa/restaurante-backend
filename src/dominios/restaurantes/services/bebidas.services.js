const Bebidas = require('../../../models/Bebidas');

class BebidasServices {

    async create(body, token) {
        try {
            // Verifica se a bebida ja existe
            const existingBebida = await Bebidas.findOne({ where: { nome: body.nome } });
            if (existingBebida) {
                throw new Error("Bebida já cadastrado");
            }
            // Cria a bebida
            const bebida = await Bebidas.create({
                ...body,
                restaurante_id: token.restaurante_id
            });
            return bebida;
        } catch (error) {
            // Deixa o controller lidar com o erro
            throw error;
        }
    }

}

module.exports = new BebidasServices();