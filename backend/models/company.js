"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    static associate({ Application }) {
      this.hasMany(Application, {
        foreignKey: "companyId",
        as: "applications",
      });
    }

    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  Company.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      companyName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Company",
      tableName: "companies",
    }
  );
  return Company;
};
