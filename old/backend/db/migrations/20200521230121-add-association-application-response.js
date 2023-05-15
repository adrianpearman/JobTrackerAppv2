"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("Applications", "ResponseId", {
        type: Sequelize.INTEGER,
        references: {
          model: "Responses",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("Applications", "ResponseId")
    ]);
  }
};
