"use strict";
module.exports = (sequelize, DataTypes) => {
  const Recruiter = sequelize.define(
    "Recruiter",
    {
      recruiterMessage: {
        type: DataTypes.STRING,
        allowNull: false
      },
      recruiterPlatform: {
        type: DataTypes.STRING,
        allowNull: false
      },
      recruiterName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      recruiterRole: {
        type: DataTypes.STRING,
        allowNull: false
      },
      recruiterMonth: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      recruiterYear: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      recruiterDate: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      recruiterCompany: {
        type: DataTypes.STRING,
        allowNull: false
      },
      recruiterLeadToInterview: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      recruiterLeadToRole: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      recruiterHiringContract: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      recruiterHiringInternal: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );
  Recruiter.associate = function(models) {
    // associations can be defined here
  };
  return Recruiter;
};
