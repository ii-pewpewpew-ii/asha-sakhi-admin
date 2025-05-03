const sendAppointmentReminders = require('./disseminate');
const createAppointments = require("./create");
const fetchAppoinmetns = require('./fetch');

module.exports = {sendAppointmentReminders, createAppointments, fetchAppoinmetns};