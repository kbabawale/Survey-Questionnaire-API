const sequelize = require("./db");
const Sequelize = require("sequelize");

const SaharaSurvey = sequelize.define(
   "saharasurvey",
   {
      saharauserid: { type: Sequelize.STRING(126) },
      name: { type: Sequelize.STRING(126) },
      address: { type: Sequelize.STRING(126) },

      phone: {
         type: Sequelize.STRING(126)
      },
      income: { type: Sequelize.STRING(126) },
      permission: { type: Sequelize.STRING(126) },
      timeofday: { type: Sequelize.STRING(126) },
      gender: { type: Sequelize.STRING(126) },
      location: { type: Sequelize.STRING(126) },
      lat: { type: Sequelize.STRING(126) },
      lng: { type: Sequelize.STRING(126) }
   },
   {
      timestamps: true
   }
);


module.exports = SaharaSurvey;
