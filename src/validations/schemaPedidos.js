const Yup = require('yup');

const schema = Yup.object().shape({
    entrega: Yup.string().oneOf(['Entrega', 'Retirada'], 'Entrega obrigatória, escolha entre Entrega ou Retirada').required('Entrega obrigatória'),
    pagamento: Yup.string().oneOf(['Dinheiro', 'Credito', 'Debito', 'Pix'], 'Pagamento obrigatório, escolha entre Dinheiro, Credito, Debito ou Pix').required('Pagamento obrigatório'),
    observacao: Yup.string().max(300, 'A observação deve ter no máximo 300 caracteres'),
    pratos_id: Yup.array().required('Pratos obrigatórios'),
    bebidas_id: Yup.array().required('Bebidas obrigatórias'),
});

module.exports = schema;
