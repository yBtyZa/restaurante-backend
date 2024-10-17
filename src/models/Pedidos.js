const connection = require('../database/connection');
const { DataTypes } = require('sequelize');

const ItensPedidos = require('./ItensPedidos');
const Pratos = require('./Pratos');
const Bebidas = require('./Bebidas');

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

// Associações
Pedidos.belongsToMany(Pratos, {
    through: ItensPedidos,
    foreignKey: 'pedido_id',
    otherKey: 'prato_id',
    as: 'pratos'
});

Pedidos.belongsToMany(Bebidas, {
    through: ItensPedidos,
    foreignKey: 'pedido_id',
    otherKey: 'bebida_id',
    as: 'bebidas'
});

module.exports = Pedidos