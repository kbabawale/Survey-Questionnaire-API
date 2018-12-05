const ResponseObj = require("../../utilities/responsehandler");
let Users = require("../../database/users");

class Edit {
   constructor(data, res) {
      this.data = data.body;
      this.res = res;
      this.edit();
   }

   validateData() {
      
        const {
            id,
            count_no
        } = this.data;
      
      //id validation
      if (id == undefined) {
        return { state: false, errorMsg: "ID must be provided" };
     }

      // firstname validation
      if (
        count_no == undefined || count_no == '') {
        return { state: false, errorMsg: "New Count Must Be Provided." };
     }

     return { state: true };
   
   }
   

   edit() {
      let validated = this.validateData();
      if (validated.state) {
        const {
            id,
            count_no
        } = this.data;

            Users.findOne({ where: { id:id } }).then(user => {
            if (user == null) {
               let responseData = JSON.stringify({
                  statusMsg: "User was not found."
               });
               return ResponseObj.responseHandlers(400, this.res, responseData);
            }
            user.update({
                count:count_no
            });
            let responseData = JSON.stringify({
               statusMsg: "User Count Updated Successfully."
            });
            return ResponseObj.responseHandlers(200, this.res, responseData);
            
         });
      } else {
         let responseData = JSON.stringify({
            statusMsg: validated.errorMsg
         });
         return ResponseObj.responseHandlers(400, this.res, responseData);
      }
   }
}

module.exports = Edit;
