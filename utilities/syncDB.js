const questions2 = require("../database/questions2");
const questions3 = require("../database/questions3");
const saharausers = require("../database/saharauser");
const saharasurvey = require("../database/saharasurvey");
const users = require("../database/users");

const sync = () => {
   users.sync();
   questions2.sync();
   questions3.sync();
   saharausers.sync();
   saharasurvey.sync();
};
module.exports = sync;
