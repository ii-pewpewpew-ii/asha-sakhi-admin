const { Infant } = require("../../models/entities");
const { getResponse, errorMessageUtil, payloadUtil } = require("../../utils/responseUtil");

const saveInfant = async (req, res) => {
    try {
        const infantData = req.body;
        const dateOfBirth = infantData.dateOfBirth;
        const {workerId, patientId } = await Infant.create(infantData);
        await scheduleInfantAppointments({ dateOfBirth , workerId, patientId  });
        return getResponse(res, 200, payloadUtil({message: "Infant saved and appointments scheduled"}));
    } catch (err) {
        getResponse(res, 501, errorMessageUtil("Server Error: " + err.message));
    }
}

async function scheduleInfantAppointments({ birthDate, workerId, patientId }) {
    const appointmentOffsets = [3, 7, 14, 28]; // days after birth
    const appointmentStatus = "Scheduled"; // or whatever default you want

    const appointments = appointmentOffsets.map(days => {
        const appointmentDate = new Date(birthDate);
        appointmentDate.setDate(appointmentDate.getDate() + days);

        return {
            workerId,
            patientId,
            appointmentDate,
            appointmentStatus
        };
    });

    try {
        const result = await Appointment.bulkCreate(appointments);
        console.log('Appointments scheduled successfully:', result);
    } catch (error) {
        console.error('Error scheduling appointments:', error);
    }
}

module.exports = saveInfant;