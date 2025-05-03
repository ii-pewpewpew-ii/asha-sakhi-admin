const { Appointment } = require("../../models/checkup");
const { getResponse, errorMessageUtil, payloadUtil } = require("../../utils/responseUtil");


const fetchAppointments = async (req, res) => {
    try {
        const workerId = req.query.workerId;
        const appointmentData = await Appointment.findAll({
            where: {
                workerId: workerId
            }
        }).then((val)=>{
            const listVal = [];
            val.forEach((record) => {
                listVal.push(record);
            })
            return listVal;
        }).catch((err)=>{
            console.error(err);
            return getResponse(res, 501, errorMessageUtil("Error while processing reques." + err.message));
        })
        return getResponse(res, 200, payloadUtil(appointmentData)); 
    } catch (err) {
        console.error(err);
        getResponse(res, 501, errorMessageUtil("Server Error. Try again Later." + err.message));
    }
}

module.exports = fetchAppointments;