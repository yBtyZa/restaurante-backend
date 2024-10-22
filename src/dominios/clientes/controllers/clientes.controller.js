const ClientesServices = require('../services/clientes.services');
const schema = require('../../../validations/schemaClientes');
const schemaUpdate = require('../../../validations/schemaUpdateCliente');
const Yup = require('yup');

class ClientesController {

    async create(req, res) {
        const { body } = req;
        try{
            // Valida o body da requisição com o esquema Yup
            await schema.validate(body, { abortEarly: false });

            // Cria o cliente se a validação passar
            const cliente = await ClientesServices.create(body);

            return res.status(201).json(cliente);
        }catch(error){
            // Verifica se o erro é de validação do Yup
            if(error instanceof Yup.ValidationError){
                return res.status(400).json({ message: error.errors });
            }

            // Verifica se o erro é relacionado ao email duplicado
            if (error.message === "Email já cadastrado para este restaurante") {
                return res.status(400).json({ message: error.message });
            }
            
            return res.status(500).json({ message: "Erro no servidor. Por favor, tente novamente." });
        }
    }

    async update(req, res) {
        const { cliente_id,  restaurante_id} = req.token;
        const { body } = req;
        try {
            // Valida o body da requisição com o esquema Yup
            await schemaUpdate.validate(body, { abortEarly: false });

            // Atualiza o cliente logado
            const cliente = await ClientesServices.update(cliente_id, restaurante_id, body);
            return res.status(200).json(cliente);
        } catch (error) {
            console.log(error);
            // Verifica se o erro é de validação do Yup
            if (error instanceof Yup.ValidationError) {
                return res.status(400).json({ message: error.errors });
            }

            // Verifica se o erro é relacionado ao email duplicado
            if (error.message === "Email já cadastrado para este restaurante") {
                return res.status(400).json({ message: error.message });
            }

            // Para outros erros, retorna status 500
            return res.status(500).json({ message: "Erro no servidor. Por favor, tente novamente." });
        }
    }

    async listAll(req, res) {
        const { restaurante_id } = req.token;
        try {
            // Lista todos os clientes
            const clientes = await ClientesServices.listAll(restaurante_id);
            return res.status(200).json(clientes);
        } catch (error) {
            // Se nenhum cliente for encontrado
            if (error.message === "Nenhum cliente encontrado") {
                return res.status(404).json({ message: error.message });
            }
            // Para outros erros, retorna status 500
            return res.status(500).json({ message: "Erro no servidor. Por favor, tente novamente." });
        }
    }

    async listOne(req, res) {
        const { id } = req.params;
        try {
            // Lista um cliente
            const cliente = await ClientesServices.listOne(id);
            return res.status(200).json(cliente);
        } catch (error) {
            // Caso o cliente nao exista
            if (error.message === "Cliente não encontrado") {
                return res.status(404).json({ message: error.message });
            }
            // Para outros erros, retorna status 500
            return res.status(500).json({ message: "Erro no servidor. Por favor, tente novamente." });
        }
    }

}

module.exports = new ClientesController()