const connection = require('../database/connection');
const { DataTypes } = require('sequelize');

const Pedidos = connection.define('pedidos', {
    restaurante_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'restaurantes', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    cliente_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'clientes', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    entrega: {
        type: DataTypes.ENUM('Entrega', 'Retirada'),
        allowNull: false
    },
    pagamento: {
        type: DataTypes.ENUM('Dinheiro', 'Credito', 'Debito', 'Pix'),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('Pendente', 'Pronto', 'Entregue', 'Cancelado'),
        allowNull: false,
        defaultValue: 'Pendente'
    },
    observacao: {
        type: DataTypes.TEXT,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    deletedAt: {
        type: DataTypes.DATE
    }
})

module.exports = Pedidos