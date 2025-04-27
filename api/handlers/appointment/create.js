const {Appointment} = require("../../models/checkup");
const {responseUtil} = require("../../utils");

const createAppointments = async (req, res) => {
    try {
        const { workerId, patientId, appointmentDate, appointmentStatus } = req.body;

        if (!workerId || !patientId || !appointmentDate || !appointmentStatus) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newAppointment = await Appointment.create({
            workerId,
            patientId,
            appointmentDate,
            appointmentStatus
        });

        return responseUtil.getResponse(res, 200, responseUtil.payloadUtil({
            message: '✅ Appointment created successfully',
            appointment: newAppointment
        }));
    } catch (error) {
        console.error('Error creating appointment:', error);
        return responseUtil.getResponse(res, 501, responseUtil.payloadUtil({ message: 'Failed to create appointment', error: error.message }));
    }
};

module.exports = createAppointments;