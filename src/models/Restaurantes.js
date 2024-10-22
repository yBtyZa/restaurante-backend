const connection = require('../database/connection');
const { DataTypes } = require('sequelize');
const { hashSync } = require('bcryptjs');

const Restaurante = connection.define('restaurantes', {
  nome: {
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
  permissao: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'restaurante'
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

Restaurante.beforeSave(async (restaurante) => {
  restaurante.senha = hashSync(restaurante.senha, 10)
  return restaurante
})

module.exports = Restaurante