const { default: axios } = require("axios");
const dotenv = require("dotenv");

dotenv.config();
const getDietFromLLM = async (patientData) => {
    const URL = process.env.LLM_API_ENDPOINT +'/nutrition-recommendation/';
    const response = axios.post(URL,
        { query: "" },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then((val)=>{
        console.log(val);
        return val.data;

    }).catch((err)=>{
        console.error(err);
    })
    return response;
}

module.exports = getDietFromLLM;