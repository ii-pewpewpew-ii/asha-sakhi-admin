const { fetchAllPatients, savePatient, fetchSchemes } = require("./patient");
const { checkupHandler } = require("./checkup");
module.exports = { fetchAllPatients, savePatient, checkupHandler, fetchSchemes };