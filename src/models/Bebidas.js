const connection = require('../database/connection');
const { DataTypes } = require('sequelize');

const Bebidas = connection.define('bebidas', {
    restaurante_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'restaurantes', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    preco: {
        type: DataTypes.DECIMAL(10, 2),
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
});

module.exports = Bebidas