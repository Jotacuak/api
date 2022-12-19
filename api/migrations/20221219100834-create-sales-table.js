'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.createTable('sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cartId: { 
        type: Sequelize.INTEGER, 
        references: { 
              model: 'carts', 
              key: 'id' 
        }, 
        onUpdate: 'CASCADE', 
        onDelete: 'SET NULL' 
      },
      clientId: { 
        type: Sequelize.INTEGER, 
        references: { 
              model: 'clients', 
              key: 'id' 
        }, 
        onUpdate: 'CASCADE', 
        onDelete: 'SET NULL' 
      },
      payMethodId: { 
        type: Sequelize.INTEGER, 
        references: { 
              model: 'pay_methods', 
              key: 'id' 
        }, 
        onUpdate: 'CASCADE', 
        onDelete: 'SET NULL' 
      },
      reference: {
        allowNull: false,
        type: Sequelize.STRING
      },
      totalPrice: {
        allowNull: false,
        type: Sequelize.DECIMAL.UNSIGNED
      },
      totalBasePrice: {
        allowNull: false,
        type: Sequelize.DECIMAL.UNSIGNED
      },
      totalIvaPrice: {
        allowNull: false,
        type: Sequelize.DECIMAL.UNSIGNED
      },
      broadcastDate: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      broadcastHour: {
        allowNull: false,
        type: Sequelize.TIME
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
   
    await queryInterface.dropTable('sales');
  }
};