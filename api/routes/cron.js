const express = require("express");
const cronUtil = require("../utils/cronSetupUtil");
const router = express.Router();

router.post("/setup-cron", cronUtil.scheduleJobs);

module.exports = router;