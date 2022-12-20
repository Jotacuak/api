'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.createTable('company-details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      phoneNumber: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      mobileNumber: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      cifNumber: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      openingDays: {
        allowNull: false,
        type: Sequelize.STRING
      },
      customerServiceHours: {
        allowNull: false,
        type: Sequelize.STRING
      },
      visible: {
        allowNull: false,
        type: Sequelize.BOOLEAN
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
   
    await queryInterface.dropTable('company-details');
  }
};