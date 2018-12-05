const Sequelize = require("sequelize");

const sequelize = new Sequelize("call_centre", "mtrader", "gtXeAg0dtBB!", {
   host: "91.109.247.182",
   dialect: "mysql",
   timezone: "Africa/Lagos"
});

module.exports = sequelize;
