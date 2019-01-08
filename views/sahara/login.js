const ResponseObj = require("../../utilities/responsehandler");
let SaharanUser = require("../../database/saharauser");

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

      SaharanUser.findOne({ where: { username: username } }).then(user => {
        // No record found
        if (user == null) {
           let responseData = JSON.stringify({
              statusMsg: "Login Failed",
              statusCode: 400
           });
           return ResponseObj.responseHandlers(400, this.res, responseData);
        }

        

        // Validate password
        if (password == user.dataValues.password) {
            let fullname = user.dataValues.firstname+' '+user.dataValues.middlename+' '+user.dataValues.lastname;
            let responseData = JSON.stringify({
                statusMsg: "Login Successful",
                id: user.dataValues.id,
                name: fullname,
                statusCode: 200
             });
             return ResponseObj.responseHandlers(
                200,
                this.res,
                responseData
             );
        } else {
           // Invalid Password
           let responseData = JSON.stringify({
              statusMsg: "Login Failed",
              statusCode: 400
           });
           return ResponseObj.responseHandlers(400, this.res, responseData);
        }
     });
    }else{
        let responseData = JSON.stringify({
            statusMsg: validated.errorMsg,
            statusCode: 400
         });
         return ResponseObj.responseHandlers(400, this.res, responseData);
    }
   }
}

module.exports = Login;
