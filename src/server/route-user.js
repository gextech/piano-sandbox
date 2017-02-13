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
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT");
    res.set('Content-Type', 'application/json');

    console.log('handling register', req.body);
    var username = req.body.username ;
    var email = req.body.email ;
    var newUser = db.createUser(username, email);
    var innerUser = req.body.inner;

    console.log("hay inner: "+innerUser);
    console.log("Mi email: "+email);
    console.log("new user", newUser);
    console.log("user email", newUser.email);
    userService.createPianoUser(newUser.id, newUser.email, function (data) {
      console.log("---->> PIANO API createUser", data);

      if(innerUser !== undefined){
        console.log("Hay que regresar usuario al template");
        res.send(data);
        return;
      }
    });

    res.redirect('/register.html?status=created');


  });

  app.post('/isEmailExists', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT");
    res.set('Content-Type', 'application/json');

    var email = req.body.email;
    var isExist = false;

    userService.verifyEmail(email, function (data) {
      dataUser = JSON.parse(data);
      console.log(dataUser.users);
      if(dataUser.users.length > 0) {
        actualUser = dataUser.users[0];
        if(actualUser.email === email){
          isExist = true;
        }
      }

      if(isExist){
        res.send({isExist: true});
      } else {
        res.send({isExist: false});
      }
    });
  });

  app.get('/getHola', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    res.set('Content-Type', 'text/html');
    res.send('hello world GET');
  });

  return app;

};
