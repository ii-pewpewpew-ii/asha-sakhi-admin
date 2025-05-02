const authRoutes = require("./auth");
const patientRoutes = require("./patient");
const cronRoutes = require("./cron")
const dietRoutes = require("./diet");
const pingRoute = require("./ping");

module.exports = {authRoutes, patientRoutes, cronRoutes, dietRoutes, pingRoute};