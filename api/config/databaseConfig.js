const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: 5432,
    database: process.env.POSTGRES_DBNAME,
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true
        }
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
}