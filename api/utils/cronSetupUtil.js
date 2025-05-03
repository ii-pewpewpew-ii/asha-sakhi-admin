const cron = require('node-cron');
const {appointmentHandlers} = require('../handlers'); // import your handlers
const responseUtil = require("./responseUtil");
const { default: axios } = require('axios');

const scheduleJobs = (req, res) => {
    // cron.schedule('10 * * * * *', async () => {
    //     console.log('[CRON] Triggering Appointment jobs for the day');
    //     await appointmentHandlers.sendAppointmentReminders();
    // });
    schedulePing();
    console.log("[CRON] jobs setup")

    return responseUtil.getResponse(res, 200, "Cron started successfully")
};

function schedulePing() {
    const URL="https://asha-sakhi-admin.onrender.com/api/ping"
    cron.schedule("30 4 * * * *", async () => {
        axios.get(URL).then((res)=>{
            console.log("[CRON] Ping from client. Keeping server alive.");
        }).catch((err)=>{
            console.error(err);
        })
    });
}

module.exports = {
    scheduleJobs
};