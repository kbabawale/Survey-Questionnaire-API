const ResponseObj = require("../../utilities/responsehandler");
let Questions2 = require("../../database/questions2");
let validator = require("validator");

class Add {
   constructor(data, res) {
      this.data = data.body;
      this.res = res;
      this.doRegister();
   }

   validateData() {
      const {
         storename,
         store_category,
         phone,
         address,
         local_govt,
         email,
         device_os,
         mobileapp_howoften,
         sellonline_platforms,
         interest_in_ecommerce,
         where_you_buy_from,
         supply_from_where,
         supply_transport_cost,
         supply_frequency,
         color_preference_sunlight,
         color_preference_night,
         maximum_inventory_level,
         product_category,
         delivery_services,
         delivery_charge_within_local_govt,
         delivery_charge_within_lagos,
         delivery_charge_outside_lagos,
         payfordelivery_howmuch,
         wish_to_be_paid,
         userid      
      } = this.data;
      
      // firstname validation
      if (
         storename == undefined || storename == '' ||
         store_category == undefined || store_category == '' ||
         phone == undefined || phone == '' ||
         address == undefined || address == '' ||
         local_govt == undefined || local_govt == '' ||
         email == undefined || email == '' ||
         device_os == undefined || device_os == '' ||
         mobileapp_howoften == undefined || mobileapp_howoften == '' ||
         sellonline_platforms == undefined || sellonline_platforms == '' ||
         interest_in_ecommerce == undefined || interest_in_ecommerce == '' ||
         where_you_buy_from == undefined || where_you_buy_from == '' ||
         supply_from_where == undefined || supply_from_where == '' ||
         supply_transport_cost == undefined || supply_transport_cost == '' ||
         supply_frequency == undefined || supply_frequency == '' ||
         color_preference_sunlight == undefined || color_preference_sunlight == '' ||
         color_preference_night == undefined || color_preference_night == '' ||
         maximum_inventory_level == undefined || maximum_inventory_level == '' ||
         product_category == undefined || product_category == '' ||
         delivery_services == undefined || delivery_services == '' ||
         delivery_charge_within_local_govt == undefined || delivery_charge_within_local_govt == '' ||
         delivery_charge_within_lagos == undefined || delivery_charge_within_lagos == '' ||
         delivery_charge_outside_lagos == undefined || delivery_charge_outside_lagos == '' ||
         payfordelivery_howmuch == undefined || payfordelivery_howmuch == '' ||
         wish_to_be_paid == undefined || wish_to_be_paid == '' ||
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
         storename,
         store_category,
         phone,
         address,
         local_govt,
         email,
         device_os,
         mobileapp_howoften,
         sellonline_platforms,
         interest_in_ecommerce,
         where_you_buy_from,
         supply_from_where,
         supply_transport_cost,
         supply_frequency,
         color_preference_sunlight,
         color_preference_night,
         maximum_inventory_level,
         product_category,
         delivery_services,
         delivery_charge_within_local_govt,
         delivery_charge_within_lagos,
         delivery_charge_outside_lagos,
         payfordelivery_howmuch,
         wish_to_be_paid,
         userid
         } = this.data;

         Questions2.create({
            storename:storename,
            store_category:store_category,
            phone:phone,
            address:address,
            local_govt:local_govt,
            email:email,
            device_os:device_os,
            mobileapp_howoften:mobileapp_howoften,
            sellonline_platforms:sellonline_platforms,
            interest_in_ecommerce:interest_in_ecommerce,
            where_you_buy_from:where_you_buy_from,
            supply_from_where:supply_from_where,
            supply_transport_cost:supply_transport_cost,
            supply_frequency:supply_frequency,
            color_preference_sunlight:color_preference_sunlight,
            color_preference_night:color_preference_night,
            maximum_inventory_level:maximum_inventory_level,
            product_category:product_category,
            delivery_services:delivery_services,
            delivery_charge_within_local_govt:delivery_charge_within_local_govt,
            delivery_charge_within_lagos:delivery_charge_within_lagos,
            delivery_charge_outside_lagos:delivery_charge_outside_lagos,
            payfordelivery_howmuch:payfordelivery_howmuch,
            wish_to_be_paid:wish_to_be_paid,
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
