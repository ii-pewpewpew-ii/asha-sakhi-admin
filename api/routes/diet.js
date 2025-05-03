const express = require("express");
const router = express.Router();
const { dietHandlers } = require("../handlers");

router.post("/disseminate-diet", dietHandlers.disseminateDiet);

router.get("/fetch-diet", dietHandlers.fetchDietData);

module.exports = router;