'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.createTable('sale_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      saleId: { 
        type: Sequelize.INTEGER, 
        references: { 
              model: 'sales', 
              key: 'id' 
        }, 
        onUpdate: 'CASCADE', 
        onDelete: 'SET NULL' 
      },
      productId: { 
        type: Sequelize.INTEGER, 
        references: { 
              model: 'products', 
              key: 'id' 
        }, 
        onUpdate: 'CASCADE', 
        onDelete: 'SET NULL' 
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL.UNSIGNED
      },
      measurementUnit: {
        allowNull: false,
        type: Sequelize.STRING
      },
      productName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      taxType: {
        allowNull: false,
        type: Sequelize.INTEGER
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
   
    await queryInterface.dropTable('sale_details');
  }
};