'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Admins', [
    {
      firstName: "Aleisha",
      lastName: "Peterson",
      username: "apeterson",
      email: "ap@email.com",
      password: "admin1234",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: "Shay",
      lastName: "Wylie",
      username: "swylie",
      email: "sw@email.com",
      password: "admin1234",
      createdAt: new Date(),
      updatedAt: new Date()
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Admins', null, {})
  }
};
