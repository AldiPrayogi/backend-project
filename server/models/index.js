const dbConfig = require('../config/db.config');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.sequelize = Sequelize;
db.sequelize = sequelize;

db.heroes = require('./Hero')(sequelize, Sequelize);
db.types = require('./Type')(sequelize, Sequelize);

db.types.hasMany(db.heroes, {foreignKey: 'typeID'});
db.heroes.belongsTo(db.types, {
  foreignKey: 'typeID',
  targetKey: 'id',
});

module.exports = db;
