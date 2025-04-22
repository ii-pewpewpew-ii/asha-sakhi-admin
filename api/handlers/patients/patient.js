const { Patient } = require("../../models/entities");
const { Checkup } = require("../../models/checkup");
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
            const patientData = await Patient.create(req.body.patientData);
            console.log("Patient Profile created successfully");
            patientId = patientData.dataValues.patientId;
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
        const patientList = [];
        const workerId = req.params.workerId
        let data = null;

        // TODO : fetch from Worker patient map and then filter out based on workerId
        if (workerId) {
            data = await Patient.findAll({
                where: {
                    workerId: workerId
                }
            });
            data.forEach((val) => {
                patientList.push(val.dataValues);
            })
            return responseUtil.getResponse(res, 200, responseUtil.payloadUtil(patientList))
        }
        data = await Patient.findAll();
        data.forEach((val) => {
            patientList.push(val.dataValues);
        })
        return responseUtil.getResponse(res, 200, responseUtil.payloadUtil(patientList))
    } catch (err) {
        console.error(err);
        return responseUtil.getResponse(res, 501, responseUtil.errorMessageUtil(err))
    }
}

module.exports = {
    fetchAllPatients,
    savePatient
};