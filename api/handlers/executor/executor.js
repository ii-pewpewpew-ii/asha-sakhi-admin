const {patientHandler} = require("../../handlers");
const { responseUtil } = require("../../utils");

const executorHandler = async (req, res) => {
    try {
        const type = req.body.type;
        switch (type) {
            case 1: { // Create patient
                await patientHandler.createPatient(req, res);
                break;
            }
        }
    } catch (err) {
        console.error(err);
        return responseUtil.getResponse(res, 501, "Server Error. Try again Later");
    }
}