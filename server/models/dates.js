"use strict";

module.exports = (sequelize, DataTypes) => {
  const Dates = sequelize.define("Dates", {
    iden: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Cédula no puede ser nula.",
        },
      },
    },
    campus: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Sede no puede ser nula.",
        },
      },
    },
    days: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Día no puede ser nula.",
        },
      },
    },
    hours: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Grupo no puede ser nulo.",
        },
      },
    },
  });

  return Dates;
};
