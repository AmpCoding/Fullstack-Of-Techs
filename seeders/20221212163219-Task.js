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
   await queryInterface.bulkInsert('Tasks', [
    {
      adminId: 1,
      taskName: "Verify User",
      complete: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 2
    },
    {
      adminId: 1,
      taskName: "Verify User",
      complete: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 8
    },
    {
      adminId: 2,
      taskName: "Verify User",
      complete: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 5
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Tasks', null, {})
  }
};
