const express = require("express");

const {patientHandler} = require("../handlers")

const router = express.Router();

router.get("/patient-list", patientHandler.fetchAllPatients);

router.post("/save-patient", patientHandler.savePatient);

module.exports = router;