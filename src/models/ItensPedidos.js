const connection = require('../database/connection');
const { DataTypes } = require('sequelize');

const ItensPedidos = connection.define('itens_pedidos', {
    pedido_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'pedidos', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      prato_id: {
        type: DataTypes.INTEGER,
        references: { model: 'pratos', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      bebida_id: {
        type: DataTypes.INTEGER,
        references: { model: 'bebidas', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      deletedAt: {
        type: DataTypes.DATE
      }
});

module.exports = ItensPedidos