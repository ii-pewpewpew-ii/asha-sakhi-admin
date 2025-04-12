const express = require("express");
const { authHandlers } = require("../handlers");

const router = express.Router();

router.post("/login", authHandlers.loginHandler);

router.post("/signup", authHandlers.signupHandler);

module.exports = router;