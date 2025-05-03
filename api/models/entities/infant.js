const { DataTypes } = require("sequelize");

const connection = require("../../utils").connection;

const Infant = connection.define("TBL_INFANT", {
    patientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    workerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    infantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    
    gender: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: true
    },

    weightAtBirth: {
        type: DataTypes.FLOAT,
        allowNull: false
    },



}, {
    freezeTableName: true
});

module.exports = Infant;