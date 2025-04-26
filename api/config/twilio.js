const dotenv = require("dotenv");
dotenv.config();

const client = require("twilio")(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_API_KEY);
module.exports = client;