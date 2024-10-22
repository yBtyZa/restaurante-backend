const PratosServices = require('../services/pratos.services');
const schema = require('../../../validations/schemaPratos');
const schemaUpdate = require('../../../validations/schemaUpdatePratos');
const Yup = require('yup');

class PratosController {

    async create(req, res) {
        const { body, token } = req;
        try {
            // Valida o body da requisição com o esquema Yup
            await schema.validate(body, { abortEarly: false });

            // Cria o prato se a validação passar
            const prato = await PratosServices.create(body, token);
            return res.status(201).json(prato);
        } catch (error) {
            console.log(error);
            // Verifica se o erro é de validação do Yup
            if (error instanceof Yup.ValidationError) {
                return res.status(400).json({ message: error.errors });
            }

            // Verifica se o erro é relacionado ao nome duplicado
            if (error.message === "Prato já cadastrado") {
                return res.status(400).json({ message: error.message });
            }
            // Para outros erros, retorna status 500
            return res.status(500).json({ message: "Erro no servidor. Por favor, tente novamente." });
        }
    }

    async update(req, res) {
        const { prato_id } = req.params;
        const { body } = req;
        try {
            // Valida o body da requisição com o esquema Yup
            await schemaUpdate.validate(body, { abortEarly: false });

            // Atualiza o prato
            const prato = await PratosServices.update(prato_id, body);
            return res.status(200).json(prato);
        } catch (error) {
            // Verifica se o erro é de validação do Yup
            if (error instanceof Yup.ValidationError) {
                return res.status(400).json({ message: error.errors });
            }

            // Verifica se o erro é relacionado ao nome duplicado
            if (error.message === "Prato já cadastrado") {
                return res.status(400).json({ message: error.message });
            }

            // Para outros erros, retorna status 500
            return res.status(500).json({ message: "Erro no servidor. Por favor, tente novamente." });
        }
    }

    async delete(req, res) {
        const { prato_id } = req.params;
        try {
            // Deleta o prato
            await PratosServices.delete(prato_id);
            return res.status(204).json();
        } catch (error) {
            // Caso o prato não exista
            if (error.message === "Prato não encontrado") {
                return res.status(404).json({ message: error.message });
            }
            // Para outros erros, retorna status 500
            return res.status(500).json({ message: "Erro no servidor. Por favor, tente novamente." });
        }
    }
}

module.exports = new PratosController()