const { Sequelize } = require("sequelize");
const { databaseConfig } = require("../config");
const { dialectOptions } = require("../config/databaseConfig");

const sequelize = new Sequelize(
    databaseConfig.database,
    databaseConfig.user,
    databaseConfig.password,
    {
        host : databaseConfig.host,
        dialect : databaseConfig.dialect,
        dialectOptions: databaseConfig.dialectOptions
    }
);

module.exports = sequelize;
