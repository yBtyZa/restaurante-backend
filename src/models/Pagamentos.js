const connection = require('../database/connection');
const { DataTypes } = require('sequelize');

const Pedidos = require('./Pedidos');

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

Pagamentos.belongsTo(Pedidos, {
    foreignKey: 'pedido_id', // A chave estrangeira que relaciona os pedidos
    as: 'pedido' // Alias da associação
  });
  

module.exports = Pagamentos