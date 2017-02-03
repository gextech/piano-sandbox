console.log("here ------->>>", this);
console.log("here ------->>>", angular);



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

  scope.isUserExist = function(str){
    //console.log("padre tp: "+parent.tp);
    var datos = "email:"+str;
    console.log("aqui algo "+datos);

    http.post("https://41b61b65.ngrok.io/verifyEmail", datos)
      .success(function(res) {
        console.log("funciona");
        console.log(res)
      });
  }
});
