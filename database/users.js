const sequelize = require("./db");
const Sequelize = require("sequelize");


const Users = sequelize.define(
   "users",
   {
      user: { type: Sequelize.STRING(126) },
      pass: { type: Sequelize.STRING(126) },
      name: { type: Sequelize.STRING(126) },
      count: { type:Sequelize.STRING(126), defaultValue:0 }
   }
);


module.exports = Users;
