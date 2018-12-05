const express = require("express");
const bodyParser = require("body-parser");
const routeHandlers = require("./utilities/routehandler");


const AddQuestions2 = require("./views/questions/addQuestions2");
const AddQuestions3 = require("./views/questions/addQuestions3");
const GetCount = require("./views/count/get");
const SetCount = require("./views/count/set");
const AddUser = require("./views/user/add");
const Login = require("./views/user/login");

const app = express();
const dotenv = require("dotenv");
const path = require("path");
//const auth = require("./utilities/authenticate");
const syncDB = require("./utilities/syncDB");

class SRServer {
    constructor() {
       this.initExpressRoute();
       this.initExpressStart();
    }
 
    initExpressRoute() {
       syncDB();
       app.use(bodyParser.urlencoded({ extended: false }));
       app.use(bodyParser.json());
 
       // Custom token authentication middleware
       //app.use(auth);
 
       let routes = JSON.parse(routeHandlers.handleRoutes());
 
       app.get("/api/ping/", (req, res) => {
          res.writeHeader(200, {
             "Content-Type": "text/html"
          });
          res.write("This is a test");
          res.end();
       });
 
      
       app.post(routes.addQuestions2, (req, res) => {
          new AddQuestions2(req, res);
       });

       app.post(routes.login, (req, res) => {
         new Login(req, res);
      });

       app.post(routes.addQuestions3, (req, res) => {
        new AddQuestions3(req, res);
        });

        app.post(routes.getCount, (req, res) => {
            new GetCount(req, res);
        });

         app.post(routes.setCount, (req, res) => {
            new SetCount(req, res);
        });

        app.post(routes.addUser, (req, res) => {
            new AddUser(req, res);
        });

       
    }
 
    initExpressStart() {
       dotenv.config({ path: path.join(__dirname, ".env") });
 
       const port = process.env.PORT || 9000;
       app.listen(port, () => console.log(`Listen on port ${port}...`));
    }
 }
 
 new SRServer();