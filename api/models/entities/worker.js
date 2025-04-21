const { DataTypes } = require("sequelize");

const connection = require("../../utils").connection;

const Worker = connection.define("TBL_PROFILE_WORKER", {
    profileId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    workerId: {
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

    specialization: {
        type: DataTypes.TEXT
    }
}, {
    freezeTableName: true
});

module.exports = Worker;