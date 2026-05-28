'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const table = await queryInterface.describeTable('Tasks');
    if (table.userId) {
      return;
    }

    await queryInterface.addColumn('Tasks', 'userId', {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId'
      }
    });
  },

  async down (queryInterface, Sequelize) {
  }
};
