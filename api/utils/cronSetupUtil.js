const cron = require('node-cron');
const {appointmentHandlers} = require('../handlers'); // import your handlers
const responseUtil = require("./responseUtil")

const scheduleJobs = (req, res) => {
    cron.schedule('10 30 7 * * *', async () => {
        console.log('[CRON] Triggering Appointment jobs for the day');
        await appointmentHandlers.sendAppointmentReminders();
    });
    console.log("[CRON] jobs setup")

    return responseUtil.getResponse(res, 200, "Cron started successfully")
};

module.exports = {
    scheduleJobs
};