const { default: axios } = require("axios");
const dotenv = require("dotenv");
const { getResponse, errorMessageUtil, payloadUtil } = require("../../utils/responseUtil");
const { Diet } = require("../../models/checkup");
const { Patient } = require("../../models/entities");
const URL = process.env.LLM_API_ENDPOINT +'/nutrition-recommendation/';

dotenv.config();
const getDietFromLLM = async (patientData) => {
    const response = axios.post(URL,
        { query: JSON.stringify(patientData) },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then((val)=>{
        return val.data;

    }).catch((err)=>{
        console.error(err);
    })
    return response;
}

const fetchDietData = async (req, res) => {
    try {
        const patientId = req.query.patientId;
        let dietData = await Diet.findOne({
            where: {
                patientId: patientId
            }
        }).then((val)=>{
            if(!val){
                console.log("here");
                return null;
            }
            return JSON.parse(val.dataValues.dietData);
        }).catch((err)=>{
            console.error(err);
            return getResponse(res, 501, errorMessageUtil("Server Error." + err.message));
        })

        if(!dietData){
            let patientData = await Patient.findOne({
                where: {
                    patientId: patientId
                }
            }).then((val)=>{
                if(!val){
                    return null;
                }
                return val.dataValues;
            }).catch((err)=>{
                console.error(err);
                return getResponse(res, 501, errorMessageUtil("Server Error." + err.message));
            });
            let dietData = await getDietFromLLM(patientData);
            await Diet.create({
                dietData: JSON.stringify(dietData),
                patientId: patientId
            });
            return getResponse(res, 200, payloadUtil(dietData));
        } else {
            return getResponse(res, 200, payloadUtil(dietData));
        }

    } catch (err) {
        console.error(err);
        return getResponse(res, 501, errorMessageUtil("Server Error." + err.message));
    }
}

module.exports = {getDietFromLLM, fetchDietData};