const { Op } = require("sequelize");
const { Appointment } = require("../../models/checkup"); 
const { Patient, Worker } = require("../../models/entities");
const { UserProfile } = require("../../models/user");
const client = require('../../config/twilio');
const dotenv = require("dotenv");
dotenv.config();

const sendAppointmentReminders = async () => {
    try {
        const today = new Date();
        const sevenDaysFromNow = new Date();
        sevenDaysFromNow.setDate(today.getDate() + 7);

        const upcomingAppointments = await Appointment.findAll({
            where: {
                appointmentDate: {
                    [Op.between]: [today, sevenDaysFromNow]
                }
            }
        });

        for (const appointment of upcomingAppointments) {
            const patientData = await Patient.findOne({
                where: {
                    patientId: appointment.dataValues.patientId
                }
            });
            const workerProfile = await Worker.findOne({
                where: {
                    workerId: appointment.dataValues.workerId
                }
            });
            const userProfile = await UserProfile.findOne({
                where: {
                    profileId: workerProfile.dataValues.profileId
                }
            });

            await sendWorkerMessage(patientData.dataValues, userProfile.dataValues.mobileNumber, appointment.dataValues.appointmentDate)
            await sendPatientMessage(patientData.dataValues, patientData.dataValues.mobileNumber, appointment.dataValues.appointmentDate)

            console.log("Message successfully sent");
        }
    } catch (err) {
        console.error("Error sending appointment reminders:", err);
    }
};


const sendWorkerMessage = async (patientData, phoneNumber, dueDate) => {
    await client.messages.create({
        body: "Patient" + patientData.firstName + patientData.lastName +  " due for an appointment at " + dueDate.toString(),
        to: phoneNumber,
        from: process.env.TWILIO_FROM_MOBILE,
    });
}

const sendPatientMessage = async (patientData, phoneNumber, dueDate ) => {
    await client.messages.create({
        body: "Hello " + patientData.firstName + patientData.lastName +  " you are due for an appointment at " + dueDate.toString(),
        to: phoneNumber,
        from: process.env.TWILIO_FROM_MOBILE
    });
}

module.exports = sendAppointmentReminders;