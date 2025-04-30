const { DataTypes } = require("sequelize");

const connection = require("../../utils").connection;

const Checkup = connection.define("TBL_CHECKUP", {
    workerId: {
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

    bloodPressure: {
        type: DataTypes.FLOAT,
    },
    
    oxygen: {
        type: DataTypes.FLOAT,
    },
    
    weight: {
        type: DataTypes.FLOAT,
    },

    temperature: {
        type: DataTypes.FLOAT,
    },

    sugarLevel: {
        type: DataTypes.FLOAT,
    },

    bmi: {
        type: DataTypes.FLOAT
    },

    haemoglobin: {
        type: DataTypes.TEXT
    },

    checkupData: {
        type: DataTypes.TEXT
    },

    pregnancyStage: {
        type: DataTypes.TEXT
    },

    checkupType: {
        type: DataTypes.TEXT
    },

    checkupStatus: {
        type: DataTypes.INTEGER
    },
}, {
    freezeTableName: true
});

module.exports = Checkup;