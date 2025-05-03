const authRoutes = require("./auth");
const patientRoutes = require("./patient");
const cronRoutes = require("./cron")
const dietRoutes = require("./diet");
const pingRouter = require("./ping");

module.exports = {authRoutes, patientRoutes, cronRoutes, dietRoutes, pingRouter};