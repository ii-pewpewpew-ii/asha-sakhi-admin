const { DataTypes, TEXT } = require("sequelize");

const connection = require("../../utils").connection;

const Patient = connection.define("TBL_PROFILE_PATIENT", {

    patientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    state: {
        type: DataTypes.TEXT
    },

    city: {
        type: DataTypes.TEXT
    },

    languagePreference: {
        type: DataTypes.TEXT
    },

    firstName: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    lastName: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false
    },

    deliveryDate: {
        type: DataTypes.DATE,
    },

    mobileNumber: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    employmentStatus: {
        type: DataTypes.TEXT
    },

    religion: {
        type: DataTypes.TEXT
    },

    education: {
        type: DataTypes.TEXT
    },

    caste: {
        type: DataTypes.TEXT
    },

    bloodGroup: {
        type: DataTypes.TEXT
    },

    lmp: {
        type: DataTypes.DATE
    },

    previousIllness: {
        type: DataTypes.TEXT
    },

}, {
    freezeTableName: true
});

module.exports = Patient;