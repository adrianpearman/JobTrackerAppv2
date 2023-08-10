"use strict";

/** @type {import('sequelize-cli').Migration} */

const tableName = "companies";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      tableName,
      [
        {
          uuid: "8406aad0-5790-437b-a55f-dc9c6cfe3531",
          id: 1,
          companyName: "apple",
          updatedAt: "2023-07-26T02:52:53.366Z",
          createdAt: "2023-07-26T02:52:53.366Z",
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
