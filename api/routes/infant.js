const express = require("express");
const router = express.Router();
const {infantHandler} = require("../handlers");

router.post("/save-infant", infantHandler.saveInfant);

module.exports = router;