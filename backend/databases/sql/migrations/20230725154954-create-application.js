"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("applications", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      applicationDay: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      applicationMonth: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      applicationYear: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      applicationDate: {
        type: DataTypes.INTEGER,
        allowFalse: false,
      },
      decision: {
        type: DataTypes.STRING,
        allowFalse: false,
      },
      interview: {
        type: DataTypes.BOOLEAN,
        default: false,
      },
      interviewDate: {
        type: DataTypes.DATE,
        default: "",
      },
      link: {
        type: DataTypes.STRING,
        allowFalse: false,
      },
      response: {
        type: DataTypes.BOOLEAN,
        allowFalse: false,
      },
      responseDate: {
        type: DataTypes.DATE,
        default: "",
      },
      companyId: {
        type: DataTypes.INTEGER,
        allowFalse: false,
      },
      platformId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("applications");
  },
};
