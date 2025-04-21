const { DataTypes } = require("sequelize");

const connection = require("../../utils").connection;

const AppointmentStatus = connection.define("TBL_APPOINTMENT_STAT", {
    statusId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },

    statusMessage: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    freezeTableName: true
});

module.exports = AppointmentStatus;