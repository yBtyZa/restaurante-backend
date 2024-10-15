const Yup = require('yup');

const schema = Yup.object().shape({
    entrega: Yup.string().oneOf(['Entrega', 'Retirada'], 'Entrega obrigatória, escolha entre Entrega ou Retirada').required('Entrega obrigatória'),
    pagamento: Yup.string().oneOf(['Dinheiro', 'Credito', 'Debito', 'Pix'], 'Pagamento obrigatório, escolha entre Dinheiro, Credito, Debito ou Pix').required('Pagamento obrigatório'),
    observacao: Yup.string().max(300, 'A observação deve ter no máximo 300 caracteres')
});

module.exports = schema;
