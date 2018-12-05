const sequelize = require("./db");
const Sequelize = require("sequelize");


const Questions2 = sequelize.define(
   "questions2",
   {
      storename: { type: Sequelize.STRING(126) },
      store_category: { type: Sequelize.STRING(126) },
      phone: { type: Sequelize.STRING(126) },

      address: {
         type: Sequelize.STRING(126)
      },
      local_govt: { type: Sequelize.STRING(126) },

      email: { type: Sequelize.STRING(126) },

      device_os: { type: Sequelize.STRING(126) },
      mobileapp_howoften: { type: Sequelize.STRING(126) },
      
      sellonline_platforms: { type: Sequelize.STRING(126) },
      interest_in_ecommerce: { type: Sequelize.STRING(126) },
      where_you_buy_from: { type: Sequelize.STRING(126) },
      supply_from_where: { type: Sequelize.STRING(126) },
      supply_transport_cost: { type: Sequelize.STRING(126) },
      supply_frequency: { type: Sequelize.STRING(126) },
      color_preference_sunlight: { type: Sequelize.STRING(126) },
      color_preference_night: { type: Sequelize.STRING(126) },
      maximum_inventory_level: { type: Sequelize.STRING(126) },
      product_category: { type: Sequelize.STRING(126) },
      delivery_services: { type: Sequelize.STRING(126) },
      delivery_charge_within_local_govt: { type: Sequelize.STRING(126) },
      delivery_charge_within_lagos: { type: Sequelize.STRING(126) },
      delivery_charge_outside_lagos: { type: Sequelize.STRING(126) },
      payfordelivery_howmuch: { type: Sequelize.STRING(126) },
      wish_to_be_paid: { type: Sequelize.STRING(126) },
      userid: {type: Sequelize.STRING(126) }
   },
   {
      timestamps: true
   }

);


module.exports = Questions2;
