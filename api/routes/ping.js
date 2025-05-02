const express = require("express");
const { getResponse, payloadUtil } = require("../utils/responseUtil");

const router = express.Router();

router.get("/ping", (req, res)=>{
    getResponse(res, 200, payloadUtil({message: "Pinged successfully"}));
})

module.exports = router;