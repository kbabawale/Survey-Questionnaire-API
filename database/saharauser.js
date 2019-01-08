const sequelize = require("./db");
const Sequelize = require("sequelize");

const Saharausers = sequelize.define(
   "saharausers",
   {
      username: { type: Sequelize.STRING(126) },
      password: { type: Sequelize.STRING(126) },
      firstname: { type: Sequelize.STRING(126) },

      lastname: {
         type: Sequelize.STRING(126)
      },
      middlename: { type: Sequelize.STRING(126) }
   },
   {
      timestamps: true
   }
);


module.exports = Saharausers;
