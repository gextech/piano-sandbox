console.log("here ------->>>", this);
console.log("here ------->>>", angular);



var scope = angular.element($("#thisForm")).scope();


scope.$apply(function() {
  scope.double = function(value) { return value * 2; };
  scope.isValid = false;
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
});
