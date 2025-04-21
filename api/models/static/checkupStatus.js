const { DataTypes } = require("sequelize");

const connection = require("../../utils").connection;

const CheckupStatus = connection.define("TBL_CHECKUP_STAT", {
    statusId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },

    statusMessage: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    freezeTableName: true
});

module.exports = CheckupStatus;