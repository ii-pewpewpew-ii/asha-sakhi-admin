const { DataTypes } = require("sequelize");

const connection = require("../../utils").connection;

const Doctor = connection.define("TBL_PROFILE_DOCTOR", {
    profileId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    doctorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    hospital: {
        type: DataTypes.TEXT
    },

    city: {
        type: DataTypes.TEXT
    },

    specialization: {
        type: DataTypes.TEXT
    }
}, {
    freezeTableName: true
});

module.exports = Doctor;