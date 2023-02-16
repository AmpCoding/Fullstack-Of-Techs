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
   await queryInterface.bulkInsert('DMs', [
    {
      toId: 4,
      fromId: 1,
      subject: "Hello",
      content: "Hi, I'm Boris! What is your name?",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      toId: 5,
      fromId: 6,
      subject: "Hi",
      content: "I see that you travel. Where are some places you've visited?",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      toId: 10,
      fromId: 7,
      subject: "Hey",
      content: "Baking and wine tasting sounds like a great combo! My name is Johnny btw.",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      toId: 3,
      fromId: 9,
      subject: "I also love art",
      content: "Hi, my name is Teddy! Nice to meet you!",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      toId: 4,
      fromId: 2,
      subject: "Hi",
      content: "Hey, I'm Wayne. What is your favorite genre of music?",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      toId: 9,
      fromId: 8,
      subject: "Question",
      content: "What makes you very traditional?",
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
    await queryInterface.bulkDelete('DMs', null, {})
  }
};
