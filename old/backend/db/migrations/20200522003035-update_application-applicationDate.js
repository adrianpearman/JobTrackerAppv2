"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("Applications", "applicationDate", {
        type: Sequelize.BIGINT,
        allowNull: false
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("Applications", "applicationDate", {
        type: Sequelize.INTEGER,
        allowNull: false
      })
    ]);
  }
};
