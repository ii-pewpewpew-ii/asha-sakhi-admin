const { DataTypes } = require("sequelize");

const connection = require("../../utils").connection;

const Document = connection.define("TBL_DOCUMENTS", {
    checkupId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },

    documentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    documentPath: {
        type: DataTypes.TEXT,
        allowNull: false,
    },

    documentName: {
        type: DataTypes.TEXT
    },
}, {
    freezeTableName: true
});

module.exports = Document;