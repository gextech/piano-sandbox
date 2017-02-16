var apiUrl = "https://localhost:3000";

var scope = angular.element($("#thisForm")).scope();
var http = angular.injector(["ng"]).get("$http");

scope.$apply(function() {
  scope.double = function(value) { return value * 2; };
  scope.isValid = false;
  scope.isEmailExist = false;

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

  scope.validateForm = function() {
    console.log(scope.isValid);
    return scope.isValid;
  }

  scope.sendDataToParent = function(currentTerm) {;
    //Send a loginRequired event
    var message = {};
    message.parentURL = window.TPParam.params.url;
    message.sender = window.TPParam.params.iframeId;
    message.displayMode = window.TPParam.params.displayMode;
    message.recipient = "opener";
    //message.event = "loginRequired";
    message.event = "customEvent";

    var currentUser = {firstName: scope.user.name, email: scope.user.email};
    var myparams = {sender: message.sender, displayMode: "modal", allowReturnToStartState: true, startScreen: "register" , termId: currentTerm,  user: currentUser};
    message.params = { eventName: "userRegister", params: myparams };
    var encMsg = JSON.stringify(message);
    console.log(encMsg);

    window.parent.postMessage(encMsg, message.parentURL);

  }

  scope.userLogin = function() {
    var userEmail = scope.user.loginEmail;
    console.log("Login de usuario con email: "+userEmail);

    if(userEmail === undefined){
      //Mandar aviso de email vacio
    } else {
      //Login
      //Send a login event
      var message = {};
      message.parentURL = window.TPParam.params.url;
      message.sender = window.TPParam.params.iframeId;
      message.displayMode = window.TPParam.params.displayMode;
      message.recipient = "opener";
      //message.event = "loginRequired";
      message.event = "customEvent";
      var currentUser = {email: userEmail};

      var myparams = {sender: message.sender, displayMode: "modal", allowReturnToStartState: true, startScreen: "register" , user: currentUser};
      message.params = { eventName: "userLogin", params: myparams };

      var encMsg = JSON.stringify(message);
      console.log(encMsg);

      window.parent.postMessage(encMsg, message.parentURL);
    }
  }
});
