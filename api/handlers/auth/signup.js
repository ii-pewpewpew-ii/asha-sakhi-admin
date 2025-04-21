const bcrypt = require("bcrypt");
const { userUtils } = require("../../models/user");
const { getResponse, errorMessageUtil, payloadUtil } = require("../../utils/responseUtil");
const { SALT_ROUNDS } = require("../../constants/apiConstants");

/*
 PATHS : /api/auth/signup
 POST : {emailId,password}
 RESPONSE : {Status,message}
*/

const signupHandler = async (req, res) => {
    
    if(!req.body) {
        return getResponse(res, 400, errorMessageUtil("Invalid Payload"));
    } 

    const emailId = req.body.emailId;
    const password = req.body.password;

    if(emailId && password) {
        try {
            const data = await userUtils.getUserDataWithEmail(emailId);

            if(data) {
                return getResponse(res, 403, errorMessageUtil("EmailId already exists"));
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
                            const data = await userUtils.createUser(emailId, hash);
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