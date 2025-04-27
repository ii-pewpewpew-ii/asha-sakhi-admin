const {DataTypes} = require("sequelize");
const UserProfile = require("./profile");
const RoleUserMap = require("./roleUserMap");
const connection = require("../../utils").connection;
 
const User = connection.define("TBL_USER", {
    mobileNumber: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    },
    
    password: {
        allowNull: false,
        type: DataTypes.TEXT,
    },
    
    userId : {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true
    },
}, {
    freezeTableName : true
});

User.hasOne(UserProfile, {
    foreignKey: "userId",
    sourceKey: "userId"
});

User.hasOne(RoleUserMap, {
    foreignKey: "userId",
    sourceKey: "userId"
})

async function getUserDataWithMobileNumber(mobileNumber) {
    const data = await User.findOne({
        where: {
            mobileNumber: mobileNumber
        }
    })
    if ([null, undefined].includes(data)) {
        return null;
    }
    return data.dataValues;
}

async function createUser(mobileNumber, hashedPassword) {
    return await User.create({
        mobileNumber: mobileNumber,
        password: hashedPassword
    });
}

const userUtils = {
    getUserDataWithMobileNumber : getUserDataWithMobileNumber,
    createUser: createUser
}
module.exports = {User, userUtils};