const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userUtils, roleUtil, UserProfile } = require("../../models/user");
const { getResponse, errorMessageUtil, payloadUtil } = require("../../utils/responseUtil");
const JWTDetails = require("../../config/jwt");
const { Doctor, Worker } = require("../../models/entities");

/*
 PATHS : /api/auth/login
 POST : {mobileNumber,password}
 RESPONSE : {Status,message,token,userProfile}
*/

const loginHandler = async (req, res) => {
    try {
        if(!req.body) {
            return getResponse(res, 400, errorMessageUtil("Invalid Payload"));
        } 
        const mobileNumber = req.body.mobileNumber;
        const password = req.body.password;
        if ( mobileNumber && password) {
            const userData = await userUtils.getUserDataWithMobileNumber(mobileNumber);

            if ( userData === null ) {
                return getResponse(res, 401, errorMessageUtil("User is not registered")); 
            }
            bcrypt.compare(password, userData.password, async (err, result) => {
                if (err) {
                    console.error(err);
                    return getResponse(res, 501, errorMessageUtil("Internal Server Error. Please try again later"));
                } else {
                    const roleData = await roleUtil.getRoleData(userData.userId);
                    if (roleData === null) {
                        return getResponse(res, 401, errorMessageUtil("No Role associated with User. Contact admin"));
                    }

                    if ( result === true ) {
                        const id = userData.userId;
                        const role = roleData.roleName;
                        
                        // Get user profile information
                        const userProfile = await UserProfile.findOne({
                            where: {
                                userId: id
                            },
                            attributes: ['firstName', 'lastName', 'profileId']
                        });
                        let data =  await Doctor.findOne({
                            where: {
                                profileId: userProfile.dataValues.profileId
                            }
                        });
                        if(!data) {
                            data = await Worker.findOne({
                                where: {
                                    profileId: userProfile.dataValues.profileId
                                }
                            })
                        }

                        var token = jwt.sign({id, role}, JWTDetails.secret, {expiresIn : JWTDetails.jwtExpiration});
                        res.set("x-access-token", token);
                        return getResponse(res, 200, payloadUtil({
                            message: "Logged in successfully.",
                            token: token,
                            profile: userProfile ? {...{
                                firstName: userProfile.firstName,
                                lastName: userProfile.lastName
                            }, ...data.dataValues} : null
                        }));
                    } else {
                        return getResponse(res, 401, errorMessageUtil("Incorrect password."))
                    }
                }
            })
        } else {
            return getResponse(res, 400, errorMessageUtil("Invalid Payload"));
        }
    } catch (err) {
        console.error(err);
        return getResponse(res, 501, errorMessageUtil("Internal Server error. Please try again later."));
    }
}

module.exports = {loginHandler};
