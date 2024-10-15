const ClientesServices = require('../services/clientes.services');
const schema = require('../../../validations/schemaClientes');
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
            console.log(error);
            // Verifica se o erro é de validação do Yup
            if(error instanceof Yup.ValidationError){
                return res.status(400).json({ message: error.errors });
            }

            // Verifica se o erro é relacionado ao email duplicado
            if (error.message === "Email já cadastrado") {
                return res.status(400).json({ message: error.message });
            }
            
            return res.status(500).json({ message: "Erro no servidor. Por favor, tente novamente." });
        }
    }

}

module.exports = new ClientesController()