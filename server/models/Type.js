const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Types', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
    },
  });
};
