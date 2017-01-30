

var api = require("./ApiPiano.js");
module.exports = {

  getUserAccesList : function (uid, cb) {
    api.request("/publisher/user/access/list", "GET", null, {uid:uid})
      .then(cb).catch(function (err) {
      console.log("trouble", err);
    })
  }

}
