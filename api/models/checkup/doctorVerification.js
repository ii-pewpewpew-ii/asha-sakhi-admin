const { DataTypes } = require("sequelize");

const connection = require("../../utils").connection;

const DoctorVerification = connection.define("TBL_DOCTOR_VERIFICATION", {
    verificationId: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    doctorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    checkupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    doctorComments: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    freezeTableName: true
});

module.exports = DoctorVerification;