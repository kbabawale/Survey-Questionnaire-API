const ResponseObj = require("../../utilities/responsehandler");
const validatePassword = require("../../utilities/validatePassword");
let User = require("../../database/users");

class Login {
   constructor(data, res) {
      this.data = data.body;
      this.res = res;
      this.dologin();
   }

   validateData() {
    const {
       username,
       password
    } = this.data;
    
    // password validation
    if (
       password == undefined || password == '' || username == undefined || username == '') {
       return { state: false, errorMsg: "Fill up the fields." };
    }

    return { state: true };
 }

   dologin() {
    let validated = this.validateData();
    if (validated.state) {
      const { username, password } = this.data;

      User.findOne({ where: { username: username } }).then(user => {
        // No record found
        if (user == null) {
           let responseData = JSON.stringify({
              statusMsg: "Login Failed"
           });
           return ResponseObj.responseHandlers(400, this.res, responseData);
        }

        // Blocked User
        if (user.dataValues.active == false) {
           let responseData = JSON.stringify({
              statusMsg: "This User Account Has Been Blocked"
           });
           return ResponseObj.responseHandlers(400, this.res, responseData);
        }

        // Validate password
        if (validatePassword(password, user.password)) {

            let responseData = JSON.stringify({
                statusMsg: "Login Successful",
                user: user
             });
             return ResponseObj.responseHandlers(
                200,
                this.res,
                responseData
             );
        } else {
           // Invalid Password
           let responseData = JSON.stringify({
              statusMsg: "Login Failed"
           });
           return ResponseObj.responseHandlers(400, this.res, responseData);
        }
     });
    }else{
        let responseData = JSON.stringify({
            statusMsg: validated.errorMsg
         });
         return ResponseObj.responseHandlers(400, this.res, responseData);
    }
   }
}

module.exports = Login;
