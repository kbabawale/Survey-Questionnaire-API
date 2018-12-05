const ResponseObj = require("../../utilities/responsehandler");
let Questions3 = require("../../database/questions3");
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
         state,
         phone,
         address,
         vehicle_type,
         email,
         userid     
      } = this.data;
      
      // firstname validation
      if (
         name == undefined || name == '' ||
         state == undefined || state == '' ||
         phone == undefined || phone == '' ||
         address == undefined || address == '' ||
         
         email == undefined || email == '' ||
         
         vehicle_type == undefined || vehicle_type == '' ||
         userid == undefined || userid == '') {

         return { state: false, errorMsg: "Provide all fields." };
      }

      
      // email validation
      if (
         email == undefined ||
         (validator.isEmpty(email) == false &&
            validator.isEmail(email) == false)
      ) {
         return {
            state: false,
            errorMsg: "Email invalid"
         };
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
            state,
            phone,
            address,
            vehicle_type,
            email,
            userid
         } = this.data;

         Questions3.create({
            name:name,
            state:state,
            phone:phone,
            address:address,
            vehicle_type:vehicle_type,
            email:email,
            userid:userid
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
