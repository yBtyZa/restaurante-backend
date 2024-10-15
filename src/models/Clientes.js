const connection = require('../database/connection');
const { DataTypes } = require('sequelize');
const { hashSync } = require('bcryptjs');

const Clientes = connection.define('clientes', {
  restaurante_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'restaurantes', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  endereco: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
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

Clientes.beforeSave(async (cliente) => {
    cliente.senha = hashSync(cliente.senha, 10)
  return cliente
})

module.exports = Clientes