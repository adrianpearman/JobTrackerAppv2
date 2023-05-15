"use strict";
module.exports = (sequelize, DataTypes) => {
  const Response = sequelize.define(
    "Response",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      responseValue: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );
  Response.associate = function(models) {
    Response.hasOne(models.Application);
  };
  return Response;
};
