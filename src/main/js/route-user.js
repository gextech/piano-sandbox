var express = require('express');

var app = new express.Router();
var db = require("./user-db");
var userService = require("./services/Users");

module.exports = function () {


  app.post('/login', function (req, res) {
    console.log('handling login', req.body);
    var username = req.body.username ;
    var date = new Date();

    var data = db.getUser(username);

    if(data != undefined){

      var userRef = {
        "uid" : data.id,
        "email" : data.email,
        "timestamp" : Math.round(date.getTime()/1000)
      };

      userService.getUserAccesList(data.id, function (data) {
        console.log("---->> PIANO API", data);
      });



      var userRefTxt =  JSON.stringify(userRef);
      console.log("userRefTxt", userRefTxt);

      var userRefTxtEncrypt = tinypass.encrypt(userRefTxt);
      console.log("userRefTxtEncrypt", userRefTxtEncrypt);
      console.log("user", data);

      res.cookie('userRef', userRefTxtEncrypt );
      req.session.userRef = userRefTxtEncrypt;
      res.redirect('/restricted/');

    }else{
      res.redirect('/login.html?error="badUser"');
    }



  });

  app.post('/register', function (req, res) {
    console.log('handling register', req.body);
    var username = req.body.username ;
    var email = req.body.email ;
    var newUser = db.createUser(username, email);
    console.log("Mi email: "+email);
    console.log("new user", newUser);
    console.log("user email", newUser.email);
    userService.createPianoUser(newUser.id, newUser.email, function (data) {
      console.log("---->> PIANO API createUser", data);
    });

    res.redirect('/register.html?status=created');


  });

  app.post('/verifyEmail', function (req, res) {
    console.log("--------------------");
    var email = req.body.email;
    console.log("Email: "+email);
    console.log("Verificando si el usuario existe");
    userService.verifyEmail(email, function (data) {
      console.log("-----Verificando usuario si existe en piano------");
    });

  });

  return app;

};
