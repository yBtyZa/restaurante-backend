const PagamentosServices = require('../services/pagamentos.services');

class PagamentosController {

    async list(req, res) {
        try{

            const pagamentos = await PagamentosServices.list();
            return res.status(200).json(pagamentos);
        } catch(error){

            return res.status(500).json({ message: "Erro no servidor. Por favor, tente novamente." });
        }
    }

}

module.exports = new PagamentosController()