var rp = require('request-promise');
var extend = require('extend');


var apiToken = process.env.API_TOKEN;
var appId = process.env.TINYPASS_APPLICATION_ID;

module.exports = {


  request : function (endPoint, method, body, aqs) {

    var options = {
      method: "GET",
      uri: 'https://sandbox.tinypass.com/api/v3'
    };

    var qs = {
      "aid" : appId,
      "api_token" : apiToken
    };

    console.log(aqs);
    extend(qs, aqs);

    options.uri = options.uri + endPoint
    options.qs = qs;

    if(body!=undefined){
      options.body;
    }
    if(method != undefined ){
      options.method = "POST"
    }

    console.log("options", options);
    return rp(options);


  }

}
