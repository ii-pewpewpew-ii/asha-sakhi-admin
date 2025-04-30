const { fetchAllPatients, savePatient } = require("./patient");
const { checkupHandler } = require("./checkup");
module.exports = { fetchAllPatients, savePatient, checkupHandler };