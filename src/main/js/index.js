var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();

tinypass = require('tinypass').createClient({
  aid: process.env.TINYPASS_APPLICATION_ID,
  privateKey: process.env.TINYPASS_PRIVATE_KEY
});

console.log("appID", process.env.TINYPASS_APPLICATION_ID);
var eventHandlers = require('./event-handlers');

app.use(express.static('public'));
app.use(cookieParser());

app.use('/private', express.static('html/private'))
app.use('/restricted', express.static('html/restricted'))

app.get('/api', function (req, res) {
  console.log(req.headers);
  res.send(req.headers);
});


app.listen(3000, function () {
  console.log("Running server on 3000 wee");
});

app.get('/login', function (req, res) {
  res.send('GET request to the homepage')
});

app.post('/login', function (req, res) {
  res.cookie('logged', 'express').send('cookie set, you are logged!!');
});

app.post('/logout', function (req, res) {
  clearCookie('logged');
  res.send('cookie foo cleared');
});


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
