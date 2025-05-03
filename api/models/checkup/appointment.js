const { DataTypes } = require("sequelize");

const connection = require("../../utils").connection;

const Appointment = connection.define("TBL_APPOINTMENT", {
    workerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },

    patientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },

    appointmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    appointmentDate: {
        type: DataTypes.DATE,
        allowNull: false
    },

    appointmentStatus: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    appointmentType: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    freezeTableName: true
});

module.exports = Appointment;