const { DataTypes } = require("sequelize");

const connection = require("../../utils").connection;

const Photos = connection.define("TBL_CHECKUP_PHOTOS", {
    checkupId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },

    photoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    photoData: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    freezeTableName: true
});

module.exports = Photos;