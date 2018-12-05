const ResponseObj = require("./responsehandler");
const validateToken = require("./validateToken");

const authenticate = (req, res, next) => {
   // freePaths are routes not needing token authentication
   let freePaths = [
      
   ];
   if (freePaths.includes(req.path)) {
      next();
   } else if (req.header(process.env.TOKENNAME) == undefined) {
      let responseData = JSON.stringify({
         statusMsg: "Authentication failed."
      });
      return ResponseObj.responseHandlers(400, res, responseData);
   } else {
      let token = req.header(process.env.TOKENNAME);
      let _data = validateToken(token);
      if (_data == false) {
         let responseData = JSON.stringify({
            statusMsg: "Authentication failed."
         });
         return ResponseObj.responseHandlers(400, res, responseData);
      } else {
         req.userData = _data;
         next();
      }
   }
};

module.exports = authenticate;
