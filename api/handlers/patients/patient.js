const {Patient} = require("../../models/entities");
const {responseUtil} = require('../../utils')
const savePatient = async (req, res) => {
    
}

const fetchAllPatients = async (req, res) => {
    try {
        const patientList = [];
        const workerId = req.params.workerId
        let data = null;
        if(workerId) {
            data = await Patient.findAll({
                where: {
                    workerId: workerId
                }
            });
            data.forEach((val)=>{
                patientList.push(val.dataValues);
            })
            return responseUtil.getResponse(res,200,responseUtil.payloadUtil(patientList))
        }
        data = await Patient.findAll();
        data.forEach((val)=>{
            patientList.push(val.dataValues);
        })
        return responseUtil.getResponse(res,200,responseUtil.payloadUtil(patientList))
    } catch (err) {
        console.error(err);
        return responseUtil.getResponse(res, 501, responseUtil.errorMessageUtil(err))
    } 
}

module.exports = {
    fetchAllPatients
};