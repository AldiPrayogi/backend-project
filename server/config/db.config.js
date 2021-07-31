module.exports = {
  HOST: 'localhost',
  USER: 'postgres',
  PASSWORD: 'AldiPC',
  DB: 'heroes',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
