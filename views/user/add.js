const ResponseObj = require("../../utilities/responsehandler");
let Users = require("../../database/users");

class Add {
   constructor(data, res) {
      this.data = data.body;
      this.res = res;
      this.doRegister();
   }

   validateData() {
      const {
         user,
         pass,
         name
      } = this.data;
      // name validation
      if (
         name == undefined || name == ''
      ) {
         return { state: false, errorMsg: "Name not valid." };
      }
      
      if (pass == undefined || pass == '') {
            return { state: false, errorMsg: "Password must be provided" };
        }

        if (user == undefined || user == '') {
            return { state: false, errorMsg: "User must be provided" };
        }

      return { state: true };
   }
   doRegister() {
      let validated = this.validateData();
      if (validated.state) {
        const {
            user,
            pass,
            name
            } = this.data;

         Users.create({
            user : user,
            name : name,
            pass : pass
         })
         .then(casess => {
               let responseData = JSON.stringify({
                  statusMsg: "User Successfully Created",
                  case: casess
               });
               return ResponseObj.responseHandlers(200, this.res, responseData);
            })
            .catch(err => {
               let message;
               if (err.name == "SequelizeUniqueConstraintError") {
                  message = err.errors[0].message;
               } else {
                  message = err
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
