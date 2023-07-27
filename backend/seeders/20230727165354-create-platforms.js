"use strict";

/** @type {import('sequelize-cli').Migration} */

const tableName = "platforms";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      tableName,
      [
        {
          id: 1,
          platformName: "linkedin",
          createdAt: "2023-07-26T17:02:49.407Z",
          updatedAt: "2023-07-26T17:02:49.407Z",
        },
        {
          id: 2,
          platformName: "indeed",
          createdAt: "2023-07-26T17:02:49.407Z",
          updatedAt: "2023-07-26T17:02:49.407Z",
        },
        {
          id: 3,
          platformName: "internal site",
          createdAt: "2023-07-26T17:02:49.407Z",
          updatedAt: "2023-07-26T17:02:49.407Z",
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
