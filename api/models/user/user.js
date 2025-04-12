const {DataTypes} = require("sequelize");
const UserProfile = require("./profile");
const RoleUserMap = require("./roleUserMap");
const connection = require("../../utils").connection;
 
const User = connection.define("TBL_USER", {
    emailId : {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            notNull: true,
            notEmpty: true
        }
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

async function getUserDataWithEmail(emailId) {
    const data = await User.findOne({
        where: {
            emailId: emailId
        }
    })
    if ([null, undefined].includes(data)) {
        return null;
    }
    return data.dataValues;
}

async function createUser(emailId, hashedPassword) {
    return await User.create({
        emailId: emailId,
        password: hashedPassword
    });
}

const userUtils = {
    getUserDataWithEmail : getUserDataWithEmail,
    createUser: createUser
}
module.exports = {User, userUtils};