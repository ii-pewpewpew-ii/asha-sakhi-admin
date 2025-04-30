const { getResponse, errorMessageUtil, payloadUtil } = require("../../utils/responseUtil");
const { Checkup } = require("../../models/checkup");
const { Document } = require("../../models/checkup");
const { Patient } = require("../../models/entities");
const {uploadSingleFileToBunny} = require("./document");

const checkupHandler = async (req, res) => {
    const data = JSON.parse(req.body.data);
    try {
        const {
            workerId,
            patientId,
            bloodPressure,
            oxygen,
            weight,
            temperature,
            sugarLevel,
            bmi,
            haemoglobin,
            checkupData,
            pregnancyStage,
            checkupStatus,
        } = data;
        if (!patientId) {
            return getResponse(res, 400, errorMessageUtil("PatientId is mandatory"));
        }

      
        const newCheckup = await Checkup.create({
            workerId,
            patientId,
            bloodPressure,
            oxygen,
            weight,
            temperature,
            sugarLevel,
            bmi,
            haemoglobin,
            checkupData,
            pregnancyStage,
            checkupStatus
        });
        const patientName = await Patient.findOne({
            where: {
                patientId: patientId
            }
        }).then((val)=>{
            return val.dataValues.firstName + val.dataValues.lastName;
        })
        const checkupId = newCheckup.dataValues.checkupId;
        let files = req.files;
        if(!files){
            files = [req.file];
        }
        const documentResult = [];
        for (const file of files) {
            const result = await uploadSingleFileToBunny(file, patientName, checkupId);
            documentResult.push(result);
          }

        if (documentResult) {
            const documentData = documentResult.map(doc => ({
                checkupId: checkupId,
                documentPath: doc.documentPath,
                documentName: doc.documentName
            }));

            await Document.bulkCreate(documentData);
        }

        return getResponse(res, 201, payloadUtil({
            message: "Checkup and documents saved successfully",
            checkup: checkupId
        }));

    } catch (err) {
        console.error("Error in checkupHandler:", err);
        return getResponse(res, 501, errorMessageUtil(err.message));
    }
}

module.exports = { checkupHandler }
