"use strict";

/** @type {import('sequelize-cli').Migration} */
const tableName = "roles";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      tableName,
      [
        {
          role: "admin",
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
