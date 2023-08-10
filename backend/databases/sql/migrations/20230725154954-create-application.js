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
      applicationDate: {
        defaultValue: Date.now(),
        type: DataTypes.DATE,
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
        default: null,
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
        default: null,
      },
      sourceSite: {
        type: DataTypes.STRING,
        allowFalse: false,
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
