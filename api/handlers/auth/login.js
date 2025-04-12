const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userUtils, roleUtil } = require("../../models/user");
const { responseUtil, errorMessageUtil, payloadUtil } = require("../../utils/responseUtil");
const JWTDetails = require("../../config/jwt");

/*
 PATHS : /api/auth/login
 POST : {emailId,password}
 RESPONSE : {Status,message}
*/

const loginHandler = async (req, res) => {
    try {
        if(!req.body) {
            return responseUtil(res, 400, errorMessageUtil("Invalid Payload"));
        } 
        const emailId = req.body.emailId;
        const password = req.body.password;
        if ( emailId && password) {
            const userData = await userUtils.getUserDataWithEmail(emailId);

            if ( userData === null ) {
                return responseUtil(res, 401, errorMessageUtil("User is not registered")); 
            }
            console.log(userData);
            bcrypt.compare(password, userData.password, async (err, result) => {
                if (err) {
                    console.error(err);
                    return responseUtil(res, 501, errorMessageUtil("Internal Server Error. Please try again later"));
                } else {
                    const roleData = await roleUtil.getRoleData(userData.userId);
                    if (roleData === null) {
                        return responseUtil(res, 401, errorMessageUtil("No Role associated with User. Contact admin"));
                    }

                    if ( result === true ) {
                        const id = userData.userId;
                        const role = roleData.roleName;
                        console.log(role);
                        var token = jwt.sign({id, role}, JWTDetails.secret, {expiresIn : JWTDetails.jwtExpiration});
                        res.set("x-access-token", token);
                        return responseUtil(res, 200, payloadUtil({message : "Logged in successfully.", token : token}));
                    } else {
                        return responseUtil(res, 401, errorMessageUtil("Incorrect password."))
                    }
                }
            })
        } else {
            return responseUtil(res, 400, errorMessageUtil("Invalid Payload"));
        }
    } catch (err) {
        console.error(err);
        return responseUtil(res, 501, errorMessageUtil("Internal Server error. Please try again later."));
    }
}





module.exports = {loginHandler};
