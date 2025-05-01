const { Patient } = require("../../models/entities");
const { Checkup, Appointment } = require("../../models/checkup");
const { PatientWorkerMap } = require("../../models/user");
const { responseUtil } = require('../../utils')
const { Op } = require("sequelize");


const savePatient = async (req, res) => {
    if (!req.body) {
        return responseUtil.getResponse(res, 501, responseUtil.errorMessageUtil("Invalid request"));
    }
    try {
        let patientId = req.body.patientId;
        if (!patientId) {
            // Create Patient record, and checkup 0
            const patientData = await calculateDueDateAndScheduleAppointments(req.body.patientData, req.body.workerId);
            console.log("Patient Profile created successfully");
            patientId = patientData.patientId;
            return responseUtil.getResponse(res, 200, responseUtil.payloadUtil({ message: "Patient profile created successfully", patientData: patientData }));
        } else {
            // Update existing patient record
            const patientData = req.body.patientData;
            if (patientData) {
                await Patient.update(patientData, {
                    where: { patientId: patientId }
                });
            }
            return responseUtil.getResponse(res, 200, responseUtil.payloadUtil({ message: "Patient profile updated successfully", patientData: patientData }));

        }
    } catch (err) {
        console.error(err);
        return responseUtil.getResponse(res, 501, responseUtil.errorMessageUtil(err))
    }
}

const fetchAllPatients = async (req, res) => {
    try {
        const workerId = req.params.workerId
        let data = null;

        // TODO : fetch from Worker patient map and then filter out based on workerId
        if (workerId) {
            let patientIds = PatientWorkerMap.findAll({
                where: {
                    workerId: workerId
                }
            }).then((val) => {
                const patientIds = [];
                val.forEach((record) => {
                    patientIds.push(record.dataValues.patientId);
                })
                return patientIds;
            })
            data = await Patient.findAll({
                where: {
                    workerId: {
                        [Op.in] : patientIds
                   }
                }
            });
        } else {
            data = await Patient.findAll();
        }
        const patientList = await Promise.all(
            data.map(async (val) => {
                const checkupHistory = await Checkup.findAll({
                    where: { patientId: val.patientId }
                });

                const checkupRecords = checkupHistory.map(record => record.dataValues);

                return {
                    ...val.dataValues,
                    checkupData: checkupRecords
                };
            })
        );
        return responseUtil.getResponse(res, 200, responseUtil.payloadUtil(patientList))
    } catch (err) {
        console.error(err);
        return responseUtil.getResponse(res, 501, responseUtil.errorMessageUtil(err))
    }
}

async function calculateDueDateAndScheduleAppointments(patientData, workerId) {
    const lmp = patientData.lmp;

    if (!lmp) {
        throw new Error('LMP (Last Menstrual Period) date is required.');
    }

    const lmpDate = new Date(lmp);
    const dueDate = new Date(lmpDate);
    dueDate.setDate(dueDate.getDate() + 280);

    patientData.deliveryDate = dueDate.toISOString().split('T')[0];

    const savedPatient = await Patient.create(patientData);
    const savedPatientData = savedPatient.dataValues
    const patientId = savedPatientData.patientId;

    await PatientWorkerMap.create({
        patientId: patientId,
        workerId: workerId
    });

    const today = new Date();
    const diffInMs = today - lmpDate;
    const diffInWeeks = diffInMs / (1000 * 60 * 60 * 24 * 7);

    console.log(`Pregnancy weeks passed: ${diffInWeeks.toFixed(2)} weeks`);

    const appointmentsToSchedule = [];

    const appointmentWindows = [
        { visit: 1, minWeek: 0, maxWeek: 12, offsetFromLmp: 8 },
        { visit: 2, minWeek: 14, maxWeek: 26, offsetFromLmp: 20 },
        { visit: 3, minWeek: 28, maxWeek: 34, offsetFromLmp: 30 },
        { visit: 4, minWeek: 36, maxWeek: 40, offsetFromLmp: 37 },
    ];

    appointmentWindows.forEach(({ visit, minWeek, maxWeek, offsetFromLmp }) => {
        if (diffInWeeks < maxWeek) {
            const appointmentDate = new Date(lmpDate);
            appointmentDate.setDate(appointmentDate.getDate() + offsetFromLmp * 7);

            appointmentsToSchedule.push({
                patientId: patientId,
                appointmentDate: appointmentDate,
                appointmentStatus: 'Saved',
                workerId: workerId
            });
        }
    });

    if (appointmentsToSchedule.length === 0) {
        console.log('No appointments to schedule based on pregnancy weeks.');
        return savedPatientData;
    }

    await Appointment.bulkCreate(appointmentsToSchedule);

    console.log('Appointments scheduled successfully.');
    return savedPatientData;
}


module.exports = {
    fetchAllPatients,
    savePatient
};