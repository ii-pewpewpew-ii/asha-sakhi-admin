const { Patient } = require("../../models/entities");
const { Checkup, Appointment } = require("../../models/checkup");
const { responseUtil } = require('../../utils')


const savePatient = async (req, res) => {
    if (!req.body) {
        return responseUtil.getResponse(res, 501, responseUtil.errorMessageUtil("Invalid request"));
    }
    try {
        let patientId = req.body.patientId;
        if (!patientId) {
            // Create Patient record, and checkup 0
            const vitals = req.body.vitals;
            vitals.workerId = req.body.workerId;
            const patientData = await calculateDueDateAndScheduleAppointments(req.body.patientData, req.body.workerId);
            console.log("Patient Profile created successfully");
            patientId = patientData.patientId;
            if (vitals) {
                const checkupData = await Checkup.create({ ...vitals, ...{ patientId: patientId, checkupStatus: 0 } });
                console.log("Vitals and test results stored successfully");
                return responseUtil.getResponse(res, 200, responseUtil.payloadUtil("Vitals stored successfully"));
            } else {
                return responseUtil.getResponse(res, 200, responseUtil.payloadUtil("Patient profile created successfully"));
            }
        } else {
            // Update existing patient record
            const patientData = req.body.patientData;
            if (patientData) {    
                await Patient.update(patientData, {
                    where: { patientId: patientId }
                });
            }
            const vitals = req.body.vitals;
            if (vitals) {
                // Update the latest Checkup record with checkupStatus = 0
                const checkupRecord = await Checkup.findOne({
                    where: { patientId: patientId, checkupStatus: 0 },
                    order: [['createdAt', 'DESC']]
                });

                if (checkupRecord) {
                    await Checkup.update(
                        vitals,
                        { where: { checkupId: checkupRecord.checkupId } }
                    );
                    console.log("Vitals updated successfully");
                    return responseUtil.getResponse(res, 200, responseUtil.payloadUtil("Vitals updated successfully"));
                } else {
                    console.log("No open checkup found for this patient");
                    return responseUtil.getResponse(res, 404, responseUtil.errorMessageUtil("No checkup record found for update"));
                }
            } else {
                return responseUtil.getResponse(res, 200, responseUtil.payloadUtil("Patient profile updated successfully"));
            }
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
            data = await Patient.findAll({
                where: {
                    workerId: workerId
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
    delete patientData.lmp;

    const savedPatient = await Patient.create(patientData);
    const savedPatientData = savedPatient.dataValues

    const patientId = savedPatientData.patientId;

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