const questions2 = require("../database/questions2");
const questions3 = require("../database/questions3");
const users = require("../database/users");

const sync = () => {
   users.sync();
   questions2.sync();
   questions3.sync();
};
module.exports = sync;
