const cron = require('node-cron');
const {appointmentHandlers} = require('../handlers'); // import your handlers
const responseUtil = require("./responseUtil")

const scheduleJobs = (req, res) => {
    console.log("[CRON] jobs setup")
    cron.schedule('10 * * * * *', async () => {
        console.log('[CRON] Running weekly Monday job');
        await appointmentHandlers.sendAppointmentReminders();
    });
    // cron.schedule("* * * * * *", () => {
    //     console.log("here");
    // })
    return responseUtil.getResponse(res, 200, "Cron started successfully")
};

module.exports = {
    scheduleJobs
};