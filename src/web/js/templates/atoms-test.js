console.log("here ------->>>", this);
console.log("here ------->>>", angular);

var apiUrl = "https://b60f943f.ngrok.io";

var scope = angular.element($("#thisForm")).scope();
var http = angular.injector(["ng"]).get("$http");

/*
http.defaults.useXDomain = true;
http.defaults.withCredentials = true;
delete http.defaults.headers.common["X-Requested-With"];
http.defaults.headers.common["Accept"] = "application/json";
http.defaults.headers.common["Content-Type"] = "application/json";
*/

scope.$apply(function() {
  scope.double = function(value) { return value * 2; };
  scope.isValid = false;
  scope.isEmailExist = false;
  scope.user.email="prueba@gmail.com";
  scope.customVar = "This is customVar"
  scope.helloWorld  = function (str) {
    console.log("helloWorld" + str);
    return "HOLA " + str;
  }

  scope.validateUser  = function (str) {
    console.log("validate" + str)
    if(str === undefined || str === ""){
      scope.isValid = false;
    } else{
      scope.isValid = true;
    }


    return scope.isValid;
  }

  scope.emailValidation = function (email) {
    return scope.thisForm.email.$invalid;
  }

  scope.emailChange = function (email) {
    if(email === undefined || email === ""){
      return;
    }
    scope.isUserExist(email);
  }

  scope.isUserExist = function (email) {
    console.log("Verificando si email existe");
    var request = http({
      method: "post",
      url: apiUrl+"/user/isEmailExists",
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      data: $.param({email: email})
    });

    request.success( function(data) {
      console.log(data);
      if(data.isExist === true){
        scope.$apply(function() {
          scope.isEmailExist = true;
        });
      } else {
        scope.$apply(function() {
          scope.isEmailExist = false;
        });
      }
    });
  }

  scope.searchUser = function (email) {
    var isValid = false;
    $.ajax({
      method: "GET",
      url: apiUrl+"/user/getHola"
    })
    .done(function( data ) {
      console.log(data);
      isValid = true;
    });
    return isValid;
  }

  scope.sendDataToParent = function(currentTerm) {
    //window.postMessage();
    /*
    console.log(scope.user);
    console.log("*************");
    scope.user = {
                     "uid": "uno",
                     "email": "prueba@gmail.com",
                     "displayName": "atomsmail@gmail.com",
                     "valid": true,
                     "firstName": null,
                     "lastName": null
                 };

    console.log(scope.isUserValid());
    console.log("*************");
    console.log(scope.user);
    console.log(scope._getConfigFn());
    */
    console.log("trae algo el TPParam");
    console.log(window.TPParam);
  }

});
