"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Platform extends Model {
    static associate({ Application }) {
      this.hasMany(Application, {
        foreignKey: "platformId",
        as: "applications",
      });
    }
  }
  Platform.init(
    {
      platformName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Platform",
      tableName: "platforms",
    }
  );
  return Platform;
};
