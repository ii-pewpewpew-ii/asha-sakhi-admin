const { DataTypes } = require("sequelize");

const connection = require("../../utils").connection;

const Patient = connection.define("TBL_PROFILE_PATIENT",{
    profileId : {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

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

    languagePreference : {
        type: DataTypes.TEXT
    },

    dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false
    },

    deliveryDate: {
        type: DataTypes.DATE,
    }
});

module.exports = Patient;