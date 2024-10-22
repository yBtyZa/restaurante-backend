const connection = require('../database/connection');
const { DataTypes } = require('sequelize');

const Pratos = require('./Pratos');
const Bebidas = require('./Bebidas');

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

// Associações
ItensPedidos.belongsTo(Pratos, { foreignKey: 'prato_id', as: 'prato' });
ItensPedidos.belongsTo(Bebidas, { foreignKey: 'bebida_id', as: 'bebida' });

Pratos.hasMany(ItensPedidos, { foreignKey: 'prato_id', as: 'itens_pedidos_prato' });
Bebidas.hasMany(ItensPedidos, { foreignKey: 'bebida_id', as: 'itens_pedidos_bebida' });


module.exports = ItensPedidos