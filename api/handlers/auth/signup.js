const bcrypt = require("bcrypt");
const { userUtils } = require("../../models/user");
const { getResponse, errorMessageUtil, payloadUtil } = require("../../utils/responseUtil");
const { SALT_ROUNDS } = require("../../constants/apiConstants");

/*
 PATHS : /api/auth/signup
 POST : {mobileNumber,password}
 RESPONSE : {Status,message}
*/

const signupHandler = async (req, res) => {
    
    if(!req.body) {
        return getResponse(res, 400, errorMessageUtil("Invalid Payload"));
    } 

    const mobileNumber = req.body.mobileNumber;
    const password = req.body.password;

    if(mobileNumber && password) {
        try {
            const data = await userUtils.getUserDataWithMobileNumber(mobileNumber);

            if(data) {
                return getResponse(res, 403, errorMessageUtil("mobileNumber already exists"));
            }

            bcrypt.genSalt(SALT_ROUNDS, async (err, salt) => {
                if(err) {
                    return getResponse(res, 501, errorMessageUtil("Internal Server Error."));
                }

                bcrypt.hash(
                    password,
                    salt,
                    async (err, hash) => {
                        if (err) {
                            return getResponse(res, 501, errorMessageUtil("Internal Server Error while hashing."));
                        } else {
                            const data = await userUtils.createUser(mobileNumber, hash);
                            return getResponse(res, 200, payloadUtil({message : "User created successfully"}));
                        }
                    }
                )
            })
        } catch (err) {
            return getResponse(res, 501, errorMessageUtil(err.message));
        }
    } else {
        return getResponse(res, 501, errorMessageUtil("Invalid payload data"));
    }
} 

module.exports = {signupHandler};