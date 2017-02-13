/* eslint-disable */
var fs = require('fs')
var express = require('express');
var cookieParser = require('cookie-parser');
var https = require('https');
var app = express();
var bodyParser = require('body-parser');
var userRoutes = require('./route-user');
var argv = require('yargs').argv;

tinypass = require('tinypass').createClient({
  aid: process.env.TINYPASS_APPLICATION_ID,
  privateKey: process.env.TINYPASS_PRIVATE_KEY
});

console.log("appID", process.env.TINYPASS_APPLICATION_ID);
var eventHandlers = require('./util/event-handlers');

app.use(express.static('public'));
app.use('/private', express.static('html/private'));
app.use('/restricted', express.static('html/restricted'));

var cookieSession = require('cookie-session');
app.use(cookieSession({
  keys: ['adannocallaconnada']
}));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api', function (req, res) {
  console.log(req.headers);
  res.send(req.headers);
});

app.get('/login', function (req, res) {
  res.redirect('/login.html');
});

app.get('/logout', function (req, res) {
  //res.send('cookie foo cleared');

  //req.session.destroy(function(err) {
  req.session = null;
  res.redirect('/');
  //})
});

app.get('/custom-js', function (req, res) {
  res.setHeader('content-type', 'text/javascript');
  if(req.session.userRef) {
    userRef = req.session.userRef.split("=");
    if(userRef.length > 0){
      res.end('tp.push(["setUserRef", "' + userRef[0] + '"]);');
    }
  } else {
    res.end('//A comment');
  }
});

app.use('/user/', userRoutes());

app.get('/webhook', function(req, res) {
  try {
    var data = req.query.data;

  // Decrypt the data into a payload String object
  var payload = tinypass.decrypt(data);

  // Turn the string into a Buffer object
  payload = Buffer.from(payload);

  // Filter the Buffer elements to standard ASCII so we can use JSON.parse
  // payload = payload.filter(char = > {
  //     return char > 31;
  // });

  // Finally parse the String into JSON
  payload = JSON.parse(payload);

  if (eventHandlers[payload.type] && eventHandlers[payload.type][payload.event] && typeof eventHandlers[payload.type][payload.event] === 'function') {
    eventHandlers[payload.type][payload.event].call(undefined, payload);
  } else {
    console.warn(payload.type + " " +  payload.event + " no implemented.", payload);
  }

  res.send({message: 'ok'});
  } catch (err) {
    console.error(err.stack);
    res.status(500).send({message: err.message});
  }
});

// typeof argv.https = String
if (argv.https === 'true') {
  var options = {
    key: fs.readFileSync('./piano-gex.pem'),
    cert: fs.readFileSync('./piano-gex-cert.pem')
  };
  https.createServer(options, app).listen(3000 , function () {
    console.log(">> HTTPS server running on port 3000 (https://localhost:3000)");
  });
} else {
  app.listen(3000 , function () {
    console.log(">> Server running on port 3000 (http://localhost:3000)");
  });
}
