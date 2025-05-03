const authRoutes = require("./auth");
const patientRoutes = require("./patient");
const cronRoutes = require("./cron")
const dietRoutes = require("./diet");
const pingRouter = require("./ping");
const infantRoutes = require("./infant");
const appointmentRoutes = require("./appointments");

module.exports = { 
    authRoutes,
    patientRoutes,
    cronRoutes,
    dietRoutes,
    pingRouter, 
    infantRoutes,
    appointmentRoutes
};