const Sequelize = require('sequelize');
const consoleLog = require('../libs/consoleLogger');

const sequelize = new Sequelize(
  {
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: parseInt(process.env.DB_PORT),
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      underscored: true
    },
    timezone: "Asia/Jakarta",
    operatorAliases: true
  }
)

const dbAuthenticate = async () => {
  try {
    await sequelize.authenticate();
    consoleLog("log", "Database authenticated.", "connection/database.js", "dbAuthenticate");
    return true
  } catch (error) {
    consoleLog("error", "Database cannot authenticated, please check the config.", "connection/database.js", "dbAuthenticate");
    return false
  }
}

module.exports = { Sequelize, sequelize, dbAuthenticate };