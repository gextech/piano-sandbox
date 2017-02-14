

var api = require("./ApiPiano.js");
module.exports = {

  getUserAccesList : function (uid, cb) {
    api.request("/publisher/user/access/list", "GET", null, {uid:uid})
      .then(cb).catch(function (err) {
      console.log("trouble", err);
    })
  },

  createPianoUser : function (uid, email, firstName, cb) {
    console.log("creando user de piano");
    console.log(uid);
    console.log(email);
    console.log(firstName);
    api.request("/publisher/user/create", "POST", null, {uid:uid, email:email, first_name: firstName})
      .then(cb).catch(function (err) {
      console.log("trouble", err);
    })
  },

  verifyEmail : function (email, cb) {
    api.request("/publisher/user/search", "POST", null, {email:email})
      .then(cb).catch(function (err) {
      console.log("trouble", err);
    })
  }



}
