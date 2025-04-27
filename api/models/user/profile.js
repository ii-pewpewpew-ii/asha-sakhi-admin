const { DataTypes } = require("sequelize");

const connection = require("../../utils").connection;

const UserProfile = connection.define("TBL_USER_PROFILE", {
    profileId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true
    },

    // mobileNumber: {
    //     type: DataTypes.TEXT,
    //     allowNull: false
    // },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    firstName: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    lastName: {
        type: DataTypes.TEXT,
        allowNull: true
    },

}, {
    freezeTableName : true
})


module.exports = UserProfile;