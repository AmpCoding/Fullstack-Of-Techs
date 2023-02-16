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
   await queryInterface.bulkInsert('Users', [
    {
      firstName: "Boris",
      lastName: "Williams",
      email: "bw@email.com",
      linkedIn: "bw@linkein.com",
      jobTitle: "Project Manager",
      username: "bwilliams",
      password: "test1234",
      city: "New York",
      state: "New York",
      zip: 10001,
      aboutMe: "I like sports, photography and all things tech!",
      age: 33,
      sex: "Male",
      interests: "Female",
      createdAt: new Date(),
      updatedAt: new Date(),
      verified_users: true
    },
    {
      firstName: "Wayne",
      lastName: "Carter",
      email: "wc@email.com",
      linkedIn: "wc@linkein.com",
      jobTitle: "Frontend Developer",
      username: "wcarter",
      password: "test1234",
      city: "Philadelphia",
      state: "Pennsylvania",
      zip: 19131,
      aboutMe: "I am family oriented and love to travel!",
      age: 28,
      sex: "Male",
      interests: "Female",
      createdAt: new Date(),
      updatedAt: new Date(),
      verified_users: false
    },
    {
      firstName: "Bella",
      lastName: "Johnson",
      email: "bj@email.com",
      linkedIn: "bj@linkein.com",
      jobTitle: "Data Analyst",
      username: "bjohnson",
      password: "test1234",
      city: "Wilmington",
      state: "Delaware",
      zip: 19803,
      aboutMe: "Bookworm, art lover, coffee addict and explorer!",
      age: 26,
      sex: "Female",
      interests: "Male",
      createdAt: new Date(),
      updatedAt: new Date(),
      verified_users: true
    },
    {
      firstName: "Olive",
      lastName: "Garcia",
      email: "og@email.com",
      linkedIn: "og@linkein.com",
      jobTitle: "Backend Developer",
      username: "ogarcia",
      password: "test1234",
      city: "Jersey City",
      state: "New Jersey",
      zip: 57030,
      aboutMe: "I love music, romantic comedies and walking on the beach!",
      age: 31,
      sex: "Female",
      interests: "Male",
      createdAt: new Date(),
      updatedAt: new Date(),
      verified_users: true
    },
    {
      firstName: "Freedom",
      lastName: "Wright",
      email: "fw@email.com",
      linkedIn: "fw@linkein.com",
      jobTitle: "UI/UX Designer",
      username: "fwright",
      password: "test1234",
      city: "Miami",
      state: "Florida",
      zip: 33101,
      aboutMe: "I enjoy poetry, traveling and spending time with loved ones.",
      age: 35,
      sex: "Female",
      interests: "Female",
      createdAt: new Date(),
      updatedAt: new Date(),
      verified_users: false
    },
    {
      firstName: "Starr",
      lastName: "Jones",
      email: "sj@email.com",
      linkedIn: "sj@linkein.com",
      jobTitle: "Salesforce Administrator",
      username: "sjones",
      password: "test1234",
      city: "Denver",
      state: "Colorado",
      zip: 80014,
      aboutMe: "In my free time, I like to travel, write and play Sudoku!",
      age: 29,
      sex: "Female",
      interests: "Female",
      createdAt: new Date(),
      updatedAt: new Date(),
      verified_users: true
    },
    {
      firstName: "Johnny",
      lastName: "Blaze",
      email: "jb@email.com",
      linkedIn: "jb@linkein.com",
      jobTitle: "Cloud Architect",
      username: "jblaze",
      password: "test1234",
      city: "Baltimore",
      state: "Maryland",
      zip: 21201,
      aboutMe: "I like to cook, workout and develop cool things!",
      age: 40,
      sex: "Male",
      interests: "Female",
      createdAt: new Date(),
      updatedAt: new Date(),
      verified_users: true
    },
    {
      firstName: "Chante",
      lastName: "Davis",
      email: "cd@email.com",
      linkedIn: "cd@linkein.com",
      jobTitle: "Mobile App Developer",
      username: "cdavis",
      password: "test1234",
      city: "Las Vegas",
      state: "Nevada",
      zip: 88901,
      aboutMe: "Sewing, reading, meditating and learning new things!",
      age: 27,
      sex: "Female",
      interests: "Male",
      createdAt: new Date(),
      updatedAt: new Date(),
      verified_users: false
    },
    {
      firstName: "Teddy",
      lastName: "Brown",
      email: "tb@email.com",
      linkedIn: "tb@linkein.com",
      jobTitle: "Sevice Now Developer",
      username: "tbrown",
      password: "test1234",
      city: "Atlanta",
      state: "Georgia",
      zip: 30033,
      aboutMe: "I am very traditional, artsy and spiritual.",
      age: 30,
      sex: "Male",
      interests: "Female",
      createdAt: new Date(),
      updatedAt: new Date(),
      verified_users: true
    },
    {
      firstName: "Amber",
      lastName: "Smith",
      email: "as@email.com",
      linkedIn: "as@linkein.com",
      jobTitle: "Cybersecurity Analyst",
      username: "asmith",
      password: "test1234",
      city: "San Francisco",
      state: "California",
      zip: 94016,
      aboutMe: "I like to bake, host wine tastings and paint.",
      age: 38,
      sex: "Female",
      interests: "Male",
      createdAt: new Date(),
      updatedAt: new Date(),
      verified_users: true
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
    await queryInterface.bulkDelete('Users', null, {})
  }
};
