const { DataTypes } = require("sequelize");

const connection = require("../../utils").connection;

const Diet = connection.define("TBL_PATIENT_DIET", {
    patientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },

    dietId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    dietData: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    freezeTableName: true
});

module.exports = Diet;