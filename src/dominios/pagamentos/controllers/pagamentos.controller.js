const PagamentosServices = require('../services/pagamentos.services');

class PagamentosController {

    async listOne(req, res) {
        try{
            // Recebe o id do pagamento
            const { id } = req.params;
            // Lista um pagamento
            const pagamentos = await PagamentosServices.listOne( id );
            return res.status(200).json(pagamentos);
        } catch(error){
            // Pagamento inexistente
            if(error.message === "Pagamento não encontrado"){
                return res.status(404).json({ message: error.message });
            }
            // Retorna um erro de servidor
            return res.status(500).json({ message: "Erro no servidor. Por favor, tente novamente." });
        }
    }

}

module.exports = new PagamentosController()