const sequelize = require("./db");
const Sequelize = require("sequelize");

const Questions3 = sequelize.define(
   "questions3",
   {
      name: { type: Sequelize.STRING(126) },
      state: { type: Sequelize.STRING(126) },
      phone: { type: Sequelize.STRING(126) },

      address: {
         type: Sequelize.STRING(126)
      },
      vehicle_type: { type: Sequelize.STRING(126) },

      email: { type: Sequelize.STRING(126) },

      
      userid: {type: Sequelize.STRING(126) }
   },
   {
      timestamps: true
   }
);


module.exports = Questions3;
