"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Application extends Model {
    static associate({ Company, Platform, User }) {
      this.belongsTo(Company, { foreignKey: "companyId", as: "applications" });
      this.belongsTo(Platform, { foreignKey: "platformId" });
      this.belongsTo(User, { foreignKey: "userId" });
    }

    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  Application.init(
    {
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
    },
    {
      sequelize,
      tableName: "applications",
      modelName: "Application",
    }
  );
  return Application;
};
