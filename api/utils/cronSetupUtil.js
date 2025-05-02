const cron = require('node-cron');
const axios = require('axios');

const { appointmentHandlers } = require('../handlers'); // import your handlers
const responseUtil = require("./responseUtil")

const scheduleJobs = async (req, res) => {
    // cron.schedule('10 * * * * *', async () => {
    //     console.log('[CRON] Triggering Appointment jobs for the day');
    //     await appointmentHandlers.sendAppointmentReminders();
    // });
    await pingCron();

    console.log("[CRON] jobs setup")

    return responseUtil.getResponse(res, 200, "Cron started successfully")
};

const pingCron = async () => {
    console.log("[CRON-PING] Seting up Ping endpoint");
    cron.schedule('30 5 * * * *', async () => {
    const URL = "https://asha-sakhi-admin.onrender.com/api/ping"
    // const URL = "http://localhost:8080/api/ping"
    axios.get(URL)
      .then(response => {
        console.log('Response:', response.data);
      })
      .catch(error => {
        console.error('Error:', error.message);
      });
    })
}

module.exports = {
    scheduleJobs
};
