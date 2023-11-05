'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key : "id"
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      bookId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Books",
          key : "id"
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      qty: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};