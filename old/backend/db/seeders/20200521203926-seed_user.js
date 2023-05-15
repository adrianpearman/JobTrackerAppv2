"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          firstName: "Adrian",
          lastName: "Pearman",
          password: "passowrd123",
          email: "test@test.com",
          imageUrl:
            "https://as2.ftcdn.net/jpg/00/42/33/27/500_F_42332719_ZfXiJrgQEZAOuDmz8cEPZ2fr78766hhV.jpg"
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  }
};
