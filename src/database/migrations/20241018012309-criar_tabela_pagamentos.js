'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('pagamentos', {
       id: {
         type: Sequelize.INTEGER,
         primaryKey: true,
         autoIncrement: true
       },
       pedido_id: {
         type: Sequelize.INTEGER,
         allowNull: false,
         references: { model: 'pedidos', key: 'id' },
         onUpdate: 'CASCADE',
         onDelete: 'CASCADE'
       },
       valor : {
         type: Sequelize.DECIMAL(10, 2),
         allowNull: false,
       },
       status: {
         type: Sequelize.ENUM('Pendente', 'Confirmado', 'Cancelado'),
         allowNull: false,
         defaultValue: 'Pendente'
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
    await queryInterface.dropTable('pagamentos');
  }
};
