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
    },
    {
      sequelize,
      tableName: "applications",
      modelName: "Application",
    }
  );
  return Application;
};
