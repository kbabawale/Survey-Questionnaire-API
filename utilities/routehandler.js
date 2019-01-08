//Define all the route inside the json object and present it to the app.js

class routeHandlers {
   static handleRoutes() {
      const routeHandler = {
         addQuestions2: "/api/questions/add",
         addQuestions3: "/api/deliveryquestions/add",
         getCount: "/api/count/get",
         setCount: "/api/count/set",
         addUser: "/api/user/add",
         login: "/api/login",
         saharanLogin: "/api/sahara/login",
         saharanSurvey: "/api/sahara/survey"

      };
      return JSON.stringify(routeHandler);
   }
}

module.exports = routeHandlers;
