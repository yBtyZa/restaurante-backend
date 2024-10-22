const RestauranteServices = require('../services/restaurante.services');
const schema = require('../../../validations/schemaRestaurantes');
const Yup = require('yup');

class RestauranteController {
    async create(req, res) {
        const { body } = req;
        try {
            // Valida o body da requisição com o esquema Yup
            await schema.validate(body, { abortEarly: false });

            // Cria o restaurante se a validação passar
            const restaurante = await RestauranteServices.create(body);
            return res.status(201).json(restaurante);
        } catch (error) {
            // Verifica se o erro é de validação do Yup
            if (error instanceof Yup.ValidationError) {
                return res.status(400).json({ message: error.errors });  // Retorna todas as mensagens de erro
            }

            // Verifica se o erro é relacionado ao email duplicado
            if (error.message === "Email já cadastrado") {
                return res.status(400).json({ message: error.message });
            }

            // Para outros erros, retorna status 500
            return res.status(500).json({ message: "Erro no servidor. Por favor, tente novamente." });
        }
    }

    async listOne(req, res) {
        const { id } = req.params;
        try {
            // Lista um restaurante
            const restaurante = await RestauranteServices.listOne(id);
            return res.status(200).json(restaurante);
        } catch (error) {
            // Caso o restaurante não exista
            if (error.message === "Restaurante não encontrado") {
                return res.status(404).json({ message: error.message });
            }
            // Para outros erros, retorna status 500
            return res.status(500).json({ message: "Erro no servidor. Por favor, tente novamente." });
        }
    }
}

module.exports = new RestauranteController();
