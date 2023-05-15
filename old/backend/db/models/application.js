"use strict";
const Response = require("./response");

module.exports = (sequelize, DataTypes) => {
  const Application = sequelize.define(
    "Application",
    {
      companyName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      applicationLink: {
        type: DataTypes.STRING,
        allowNull: false
      },
      applicationPlatform: {
        type: DataTypes.STRING,
        allowNull: false
      },
      applicationMonth: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: new Date().getMonth() + 1
      },
      applicationYear: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: new Date().getFullYear()
      },
      applicationDate: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      hired: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      hiredDateMonth: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      hiredDateYear: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      hiredDate: {
        type: DataTypes.BIGINT,
        allowNull: true
      },
      interview: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      lastDayWorkedMonth: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      lastDayWorkedYear: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      response: {
        allowNull: false,
        defaultValue: 1,
        type: DataTypes.INTEGER
      }
    },
    {}
  );
  Application.associate = function(models) {
    // associations can be defined here
    Application.belongsTo(models.User);
  };
  return Application;
};
