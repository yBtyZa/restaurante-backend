'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('restaurantes', {
       id: {
         type: Sequelize.INTEGER,
         primaryKey: true,
         autoIncrement: true
       },
       nome: {
         type: Sequelize.STRING,
         allowNull: false
       },
       email: {
         type: Sequelize.STRING,
         allowNull: false,
         unique: true
       },
       senha: {
         type: Sequelize.STRING,
         allowNull: false
       },
       permissao: {
         type: Sequelize.STRING,
         allowNull: false,
         defaultValue: 'restaurante'
       },
       createdAt: {
         type: Sequelize.DATE,
         allowNull: false
       },
       updatedAt: {
         type: Sequelize.DATE,
         allowNull: false
       },
       deletedAt: {
         type: Sequelize.DATE
       }
      });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('restaurantes');
  }
};
