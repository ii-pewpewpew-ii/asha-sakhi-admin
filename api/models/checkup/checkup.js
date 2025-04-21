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
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    
    oxygen: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    
    weight: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },

    temperature: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },

    sugarLevel: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },

    checkupData: {
        type: DataTypes.BLOB
    },

    pregnancyStage: {
        type: DataTypes.TEXT
    },

    checkupStatus: {
        type: DataTypes.INTEGER
    },
}, {
    freezeTableName: true
});

module.exports = Checkup;