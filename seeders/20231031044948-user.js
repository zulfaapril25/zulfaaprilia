'use strict';
const bcrypt = require('bcrypt');
const saltRound = 10;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('zulfaa12345', saltRound);
    return queryInterface.bulkInsert('Users', [{
      username: 'Zulfaa Aprilia',
      email: 'zulfaa25@gmail.com',
      password: hashedPassword,
      admin: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
