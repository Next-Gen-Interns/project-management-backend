const sequelize = require("../config/db");
const User = require("./user.model");
const EmployeeDeatil = require("./employeeDetails.model");

User.hasOne(EmployeeDeatil,{
    foreignKey : "user_id",
    as : "employeeDetails"
});

EmployeeDeatil.belongsTo(User,  {
    foreignKey : "user_id",
    as : "user"
});

module.exports = {
    sequelize,
    User,
    EmployeeDeatil
}