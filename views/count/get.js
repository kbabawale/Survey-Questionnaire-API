const ResponseObj = require("../../utilities/responsehandler");
let Users = require("../../database/users");

class Get{
    constructor(req, res) {
        this.data = req.body;
        this.res = res;
        this.getThem();
    }
    getThem() {

        const { id } = this.data;

        //if id provided, get its' details
        if(id != ""){
            Users.findOne({ where: {id : id}}).then(user => {
                if(!user){
                    let responseData = JSON.stringify({
                        statusMsg: "No Count Found"
                    });
                    return ResponseObj.responseHandlers(400, this.res, responseData);
                    
                }else{
                    let responseData = JSON.stringify({
                        count: user.dataValues.count
                    });
                    return ResponseObj.responseHandlers(200, this.res, responseData);
                }
            });
        }else{
            let responseData = JSON.stringify({
                statusMsg: "No Count Found"
            });
            return ResponseObj.responseHandlers(400, this.res, responseData);
        }
        
    }
}

module.exports = Get;