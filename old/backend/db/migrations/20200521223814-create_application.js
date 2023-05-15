"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Applications", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      companyName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      applicationLink: {
        type: Sequelize.STRING,
        allowNull: false
      },
      applicationPlatform: {
        type: Sequelize.STRING,
        allowNull: false
      },
      applicationMonth: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: new Date().getMonth() + 1
      },
      applicationYear: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: new Date().getFullYear()
      },
      applicationDate: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      hired: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      hiredDateMonth: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      hiredDateYear: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      hiredDate: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      interview: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      lastDayWorkedMonth: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      lastDayWorkedYear: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      response: {
        allowNull: false,
        defaultValue: 1,
        type: Sequelize.INTEGER
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("applications");
  }
};
