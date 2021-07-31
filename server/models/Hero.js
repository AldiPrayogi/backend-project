const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Hero', {
    heroID: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(240),
    },
  });
};
