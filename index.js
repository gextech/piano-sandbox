var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();

app.use(express.static('public'));
app.use(cookieParser());

app.get('/api', function(req, res){
  console.log(req.headers);
  res.send(req.headers);
});

app.listen(3000, function(){
  console.log("Running server on 3000");
});

app.get('/login', function (req, res) {
  res.send('GET request to the homepage')
});

app.post('/login', function (req, res) {
  res.cookie('logged', 'express').send('loign set');
});

app.post('/logout', function (req, res) {
  clearCookie('logged');
  res.send('cookie foo cleared');
});
