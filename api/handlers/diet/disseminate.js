const { PatientWorkerMap, User, UserProfile } = require("../../models/user");
const { Patient, Worker } = require("../../models/entities");
const client = require('../../config/twilio');
const dotenv = require("dotenv");
const { getResponse, errorMessageUtil } = require("../../utils/responseUtil");
const getDietFromLLM = require("./fetch");
dotenv.config();

const data = {
    "diet_plan": {
     
      "day2": {
        "breakfast": "Daliya with Milk and Thepla (Methi), Idli with Chutney",
        "morning_snack": "Fafada with a glass of Water",
        "lunch": "Dal-Chawal Roti Sabji with Vegetables and Kadhi",
        "evening_snack": "Ragada with a glass of Water",
        "dinner": "Usal with Rice/Jowar and Roti Sabji"
      }
    },
    "region": "\": \"maharashtra\","
  };

const disseminateDiet = async (req, res) => {
    try {
        const patientId = req.body.patientId;
        const patientData = await Patient.findOne({
            where: {
                patientId: patientId
            }
        }).then((val)=>{
            return val.dataValues
        });
        const workerId = await PatientWorkerMap.findOne({
            where: {
                patientId: patientId
            }
        }).then((val)=>{
            return val.dataValues.workerId;
        });

        const workerProfileId = await Worker.findOne({
            where:{ 
                workerId: workerId
            }
        }).then((val)=>{
            return val.dataValues.profileId;
        })

        const workerUserId = await UserProfile.findOne({
            where: {
                profileId: workerProfileId
            }
        }).then((val)=>{
            return val.dataValues.userId;
        })
    
        const workerNumber = await User.findOne({
            where: {
                userId: workerUserId
            }
        }).then((val)=>{
            return val.dataValues.mobileNumber;
        })
        // fetch diet data from FastAPI
        const diet_data = await getDietFromLLM(patientData);   
        const messages = splitMessageIntoParts(JSON.stringify(diet_data));
         
        messages.forEach(async (msg, i) => {
          let messageBody = msg;
          console.log("ASHASAKHI DIET" + ' ' + `${messages.length}` + ' ' + `${i}` + ' ' + messageBody);
        // Twilio selavaagudhu ma
        //   setTimeout(async ()=>{
        //     await client.messages.create({
        //         body: messageBody + `[${i+1}/${messages.length}]`,
        //         to: workerNumber,
        //         from: process.env.TWILIO_FROM_MOBILE,
        //     });
        // }, 10000)
          

        });
        
    
        getResponse(res, 200, { message: "Message Disseminated successfully", data: dietData })    
    } catch (err) {
        console.error(err);
        return getResponse(res, 501, errorMessageUtil("Failed to disseminate message. Check logs"));
    }
    
}

function splitMessageIntoParts(message, maxPartLength = 135) {
    const totalLength = message.length;
    const parts = [];
    const totalParts = Math.ceil(totalLength / maxPartLength);
  
    for (let i = 0; i < totalParts; i++) {
      const start = i * maxPartLength;
      const end = start + maxPartLength;
      const chunk = message.substring(start, end);
      parts.push(`${chunk}`);
    }
  
    return parts;
  }



module.exports = disseminateDiet;