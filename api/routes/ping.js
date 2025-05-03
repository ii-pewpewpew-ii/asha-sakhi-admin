const express = require("express");
const { getResponse, payloadUtil } = require("../utils/responseUtil");
const router = express.Router();

router.get("",(req, res)=>{
    return getResponse(res, 200, payloadUtil("Pong from Asha-Sakhi"));
});

module.exports = router;