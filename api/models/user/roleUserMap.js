const connection = require("../../utils").connection;
const {DataTypes} = require("sequelize");

const RoleUserMap = connection.define("TBL_ROLE_USER_MAP", {
    roleId: {
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    userId: {
        primaryKey: true,
        type: DataTypes.INTEGER
    }
}, {
    freezeTableName : true
});



module.exports = RoleUserMap;