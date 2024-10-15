const BebidasServices = require('../services/bebidas.services');
const schema = require('../../../validations/schemaBebidas');
const Yup = require('yup');

class BebidasController {

    async create(req, res) {
        const { body, token } = req;
        try {
            // Valida o body da requisição com o esquema Yup
            await schema.validate(body, { abortEarly: false });

            // Cria a bebida se a validação passar
            const bebida = await BebidasServices.create(body, token);
            return res.status(201).json(bebida); 
        } catch (error) {
            console.log(error);
            // Verifica se o erro é de validação do Yup
            if (error instanceof Yup.ValidationError) {
                return res.status(400).json({ message: error.errors });
            }

            // Verifica se o erro é relacionado ao nome duplicado
            if (error.message === "Bebida já cadastrado") {
                return res.status(400).json({ message: error.message });
            }
            
            return res.status(500).json({ message: "Erro no servidor. Por favor, tente novamente." });
        }
    }
}

module.exports = new BebidasController()