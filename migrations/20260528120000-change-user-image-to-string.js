'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    if (queryInterface.sequelize.getDialect() === 'postgres') {
      await queryInterface.sequelize.query(`
        ALTER TABLE "Users"
        ALTER COLUMN "image" TYPE VARCHAR(2048)
        USING CASE
          WHEN "image" IS NULL THEN NULL
          ELSE encode("image", 'escape')
        END
      `);
      return;
    }

    await queryInterface.changeColumn('Users', 'image', {
      type: Sequelize.STRING(2048)
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'image', {
      type: Sequelize.BLOB
    });
  }
};
