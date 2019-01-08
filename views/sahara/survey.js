const ResponseObj = require("../../utilities/responsehandler");
let SaharanSurvey = require("../../database/saharasurvey");
let validator = require("validator");

class Add {
   constructor(data, res) {
      this.data = data.body;
      this.res = res;
      this.doRegister();
   }

   validateData() {
      const {
         name,
         address,
         phone,
         income,
         permission,
         timeofday,
         gender,
         location,
         lat,
         lng,
         userid     
      } = this.data;
      
      if (
         name == undefined || name == '' ||
         income == undefined || income == '' ||
         phone == undefined || phone == '' ||
         address == undefined || address == '' ||
         
         permission == undefined || permission == '' ||
         
         timeofday == undefined || timeofday == '' ||
         gender == undefined || gender == '' ||
         location == undefined || location == '' ||
         lat == undefined || lat == '' ||
         lng == undefined || lng == '' ||
         userid == undefined || userid == '') {

         return { state: false, errorMsg: "Provide all fields." };
      }

      // mobile validation
      if (
         phone == undefined ||
         validator.isNumeric(phone) == false ||
         phone.length < 11 ||
         phone.length > 15
      ) {
         return { state: false, errorMsg: "Mobile number is invalid" };
      }

      return { state: true };
   }
   doRegister() {
      let validated = this.validateData();
      if (validated.state) {
        const {
            name,
            address,
            phone,
            income,
            permission,
            timeofday,
            gender,
            location,
            lat,
            lng,
            userid 
         } = this.data;

         SaharanSurvey.create({
            name:name,
            address:address,
            phone:phone,
            income:income,
            permission:permission,
            timeofday:timeofday,
            gender:gender,
            location:location,
            lat:lat,
            lng:lng,
            saharauserid:userid
         })
            .then(question => {
               
            
               let responseData = JSON.stringify({
                  statusMsg: "Survey Answers Successfully Stored",
                  question: question
               });
               return ResponseObj.responseHandlers(200, this.res, responseData);
            })
            .catch(err => {
               let message;
               if (err.name == "SequelizeUniqueConstraintError") {
                  message = err.errors[0].message;
               } else {
                  message = err;
               }
               let responseData = JSON.stringify({
                  statusMsg: message
               });
               return ResponseObj.responseHandlers(400, this.res, responseData);
            });
      } else {
         let responseData = JSON.stringify({
            statusMsg: validated.errorMsg
         });
         return ResponseObj.responseHandlers(400, this.res, responseData);
      }
   }
}

module.exports = Add;
