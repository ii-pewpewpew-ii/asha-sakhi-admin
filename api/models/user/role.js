const { DataTypes } = require("sequelize");
const RoleUserMap = require("./roleUserMap");
const connection = require("../../utils").connection;

const Role = connection.define("TBL_ROLE", {
    roleId: {
        primaryKey : true,
        type : DataTypes.INTEGER,
        allowNull : false,
        autoIncrement : true
    },
    
    roleName: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    }
}, {
    freezeTableName : true
});

async function getRoleData(userId) {
    const data = await RoleUserMap.findOne( {
        where : {
            userId : userId
        }
    });
    if([null, undefined].includes(data)) {
        return null
    }
    const roleData = await Role.findOne( {
        where : {
            roleId: data.dataValues.roleId
        }
    })
    if([null, undefined].includes(roleData)){
        return null;
    }
    return roleData.dataValues
}

const roleUtil = {
    getRoleData: getRoleData
}
module.exports = {Role, roleUtil};