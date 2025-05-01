const { DataTypes } = require("sequelize");

const connection = require("../../utils").connection;

const PatientWorkerMap = connection.define("TBL_PATIENT_WORKER_MAP", {
    patientId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    workerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
}, {
    freezeTableName: true
})


module.exports = PatientWorkerMap;