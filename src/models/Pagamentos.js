const connection = require('../database/connection');
const { DataTypes } = require('sequelize');

const Pagamentos = connection.define('pagamentos', {
    pedido_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'pedidos', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    valor: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('Pendente', 'Confirmado', 'Cancelado'),
        allowNull: false,
        defaultValue: 'Pendente'
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
});

module.exports = Pagamentos