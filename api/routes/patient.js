const express = require("express");

const {patientHandler} = require("../handlers")

const router = express.Router();

router.get("/patient-list", patientHandler.fetchAllPatients);

module.exports = router;