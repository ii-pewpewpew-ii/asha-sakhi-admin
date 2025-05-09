const express = require("express");
const router = express.Router();
const {appointmentHandlers} = require("../handlers");

router.post("/appoinments/create-appoinments", appointmentHandlers.createAppointments);

router.get("/fetch-appointments", appointmentHandlers.fetchAppoinmetns);
module.exports = router;
