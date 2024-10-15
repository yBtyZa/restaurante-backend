const Pratos = require('../../../models/Pratos');

class PratosServices {

    async create(body, token) {
        try {
            // Verifica se o prato ja existe
            const existingPrato = await Pratos.findOne({ where: { nome: body.nome } });
            if (existingPrato) {
                throw new Error("Prato já cadastrado");
            }
            // Cria o prato
            const prato = await Pratos.create({
                ...body,
                restaurante_id: token.restaurante_id
            });
            return prato;
        } catch (error) {
            // Deixa o controller lidar com o erro
            throw error;
        }
    }

}

module.exports = new PratosServices();