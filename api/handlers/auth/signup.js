const bcrypt = require("bcrypt");
const { userUtils, UserProfile, RoleUserMap } = require("../../models/user");
const {Doctor, Worker} = require("../../models/entities")
const { getResponse, errorMessageUtil, payloadUtil } = require("../../utils/responseUtil");
const { SALT_ROUNDS } = require("../../constants/apiConstants");

/*
 PATHS : /api/auth/signup
 POST : {mobileNumber,password}
 RESPONSE : {Status,message}
*/

const signupHandler = async (req, res) => {

    if (!req.body) {
        return getResponse(res, 400, errorMessageUtil("Invalid Payload"));
    }

    const mobileNumber = req.body.mobileNumber;
    const password = req.body.password;

    if (mobileNumber && password) {
        try {
            const data = await userUtils.getUserDataWithMobileNumber(mobileNumber);

            if (data) {
                return getResponse(res, 403, errorMessageUtil("mobileNumber already exists"));
            }
            const salt = await bcrypt.genSalt(SALT_ROUNDS);
            const hashedPassword = await bcrypt.hash(password, salt);

            const user = await userUtils.createUser(mobileNumber, hashedPassword);
            const profileId = await saveUserProfile(req.body, user.dataValues.userId);

            req.body.profileId = profileId; 
            const roleData = await saveRoleData(req.body, profileId, user.dataValues.userId);
            return getResponse(res, 200, payloadUtil("Profile created successfully"));

        } catch (err) {
            return getResponse(res, 501, errorMessageUtil(err.message));
        }
    } else {
        return getResponse(res, 501, errorMessageUtil("Invalid payload data"));
    }
}

async function saveUserProfile(body, userId) {
    try {
        const data = await UserProfile.create({
            firstName: body.firstName,
            lastName: body.lastName,
            userId: userId
        })
        return data.dataValues.profileId;
    }
    catch (err) {
        console.error(err);
        throw new Error(err);
    }
}

async function saveRoleData(body, profileId, userId) {
    if(body.role === "WORKER"){
        await RoleUserMap.create({
            userId: userId,
            roleId: 1
        })
        await saveWorkerData(body, profileId);
    } else if ( body.role === "DOCTOR" ){ 
        await RoleUserMap.create({
            userId: userId,
            roleId: 2
        })
        await saveDoctorData(body, profileId);
    }
}

async function saveWorkerData(body, profileId) {
    try {
        const { state, city, languagePreference, specialization } = body;

        if (!profileId) {
            throw new Error('profileId is required.');
        }

        const newWorker = await Worker.create({
            profileId,
            state,
            city,
            languagePreference,
            specialization
        });

        return newWorker;
    } catch (error) {
        console.error('Error saving worker data:', error);
        throw new Error('Failed to save worker data: ' + error.message);
    }
}

async function saveDoctorData(body, profileId) {
    try {
        const { hospital, city, specialization } = body;

        if (!profileId) {
            throw new Error('profileId is required.');
        }

        const newDoctor = await Doctor.create({
            profileId,
            hospital,
            city,
            specialization
        });

        return newDoctor;
    } catch (error) {
        console.error('Error saving doctor data:', error);
        throw new Error('Failed to save doctor data: ' + error.message);
    }
}

module.exports = { signupHandler };