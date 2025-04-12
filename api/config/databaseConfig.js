const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    user : "postgres",
    password : process.env.POSTGRES_PASSWORD,
    host : "localhost",
    port : 5432,
    database : "ASHA-Sakhi",
    dialect : "postgres",
    pool : {
        max : 5,
        min : 0,
        acquire : 30000,
        idle : 10000
    }
}