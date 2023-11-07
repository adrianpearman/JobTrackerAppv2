"use strict";

/** @type {import('sequelize-cli').Migration} */
const tableName = "users";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      tableName,
      [
        {
          uuid: "0399eec1-ff9c-4c29-87b4-c3504da56ee1",
          firstName: "billy",
          lastName: "bean",
          email: "test@test.com",
          authUuid: "f0662d72-2f9c-43a3-ac04-6dd294436fe5",
          analyticsUuid: "64db9fde570643001c10516b",
          roleId: 1,
          updatedAt: "2023-07-26T02:03:45.567Z",
          createdAt: "2023-07-26T02:03:45.567Z",
        },
      ],
      {}
    );

    await queryInterface.sequelize.query(
      `SELECT setval('${tableName}_id_seq', max(id)) FROM ${tableName};`
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(tableName, null, {});
  },
};
