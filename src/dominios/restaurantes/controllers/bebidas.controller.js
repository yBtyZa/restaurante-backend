const BebidasServices = require('../services/bebidas.services');
const schema = require('../../../validations/schemaBebidas');
const schemaUpdate = require('../../../validations/schemaUpdateBebidas');
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

    async update(req, res) {
        const { bebida_id } = req.params;
        const { body } = req;
        try {
            // Valida o body da requisição com o esquema Yup
            await schemaUpdate.validate(body, { abortEarly: false });

            // Atualiza a bebida
            const bebida = await BebidasServices.update(bebida_id, body);
            return res.status(200).json(bebida);
        } catch (error) {
            console.log(error);
            // Verifica se o erro é de validação do Yup
            if (error instanceof Yup.ValidationError) {
                return res.status(400).json({ message: error.errors });
            }

            // Verifica se o erro é relacionado ao nome duplicado
            if (error.message === "Bebida já cadastrada") {
                return res.status(400).json({ message: error.message });
            }

            // Para outros erros, retorna status 500
            return res.status(500).json({ message: "Erro no servidor. Por favor, tente novamente." });
        }
    }
}

module.exports = new BebidasController()