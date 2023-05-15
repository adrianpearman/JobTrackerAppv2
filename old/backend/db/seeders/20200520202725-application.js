"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.bulkInsert(
      "Applications",
      [
        {
          companyName: "xczvxczv",
          applicationLink: "tewafeawf.com",
          applicationPlatform: "indeed",
          applicationMonth: 4,
          applicationYear: 2019,
          applicationDate: 1554091200000,
          hired: false,
          hiredDateMonth: 0,
          hiredDateYear: 0,
          hiredDate: 0,
          interview: false,
          lastDayWorkedMonth: 0,
          lastDayWorkedYear: 0,
          response: 1,
          UserId: 1,
          ResponseId: 1
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.bulkDelete("Applications", null, {});
  }
};
