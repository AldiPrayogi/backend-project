const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Hero', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
    },
    description: {
      type: DataTypes.TEXT,
    },
    level: {
      type: DataTypes.INTEGER,
    },
  });
};
