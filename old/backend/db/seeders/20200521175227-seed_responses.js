"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Responses",
      [
        {
          responseValue: "Not Viewed"
        },
        {
          responseValue: "Representative has reached out to me"
        },
        {
          responseValue: "Application Declined"
        },
        {
          responseValue: "Offer provided"
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Responses", null, {});
  }
};
