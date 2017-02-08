console.log("here ------->>>", this);
console.log("here ------->>>", angular);


var apiUrl = "https://c15374bd.ngrok.io";

var scope = angular.element($("#thisForm")).scope();
var http = angular.injector(["ng"]).get("$http");
http.defaults.useXDomain = true;
http.defaults.withCredentials = true;
delete http.defaults.headers.common["X-Requested-With"];
http.defaults.headers.common["Accept"] = "application/json";
http.defaults.headers.common["Content-Type"] = "application/json";


scope.$apply(function() {
  scope.double = function(value) { return value * 2; };
  scope.isValid = false;
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

  scope.emailChange = function (email) {
    console.log("Cambiando el email");
    if(email === undefined || email === ""){
      return;
    }

    scope.isUserExist(email);
  }

  scope.isUserExist = function (email) {
    console.log("Verificando si email existe");
    var isEmailExist = false;
    //scope.emailClass = "only-email";

    console.log("antes de ajax");

    $.post( apiUrl+"/user/isEmailExists", { email: email })
      .done(function( data ) {
        console.log(data);
        if(data.isExist === true){ //Mostrar pass
          console.log("Mostrar only-email-enable");
          scope.emailClass = "only-email-enable";
        } else { //Ocultar pass
          console.log("Ocultar only-email");
          scope.emailClass = "only-email";
        }
        console.log("ver clase actual");
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
});
