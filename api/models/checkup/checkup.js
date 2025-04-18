const { DataTypes } = require("sequelize");

const connection = require("../../utils").connection;

const Patient = connection.define("TBL_CHECKUP",{
    workerId : {
        type: DataTypes.INTEGER,
    },

    patientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },

    checkupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    
    checkupData: {
        type: DataTypes.BLOB
    },

    pregnancyStage: {
        type: DataTypes.TEXT
    },

    checkupStatus : {
        type: DataTypes.INTEGER
    },
});

module.exports = Patient;