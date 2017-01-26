var express = require('express');

var app = express();

app.use(express.static('public'))

app.use('/private', express.static('public/private'))

app.get('/api', function(req, res){
  console.log(req.headers);
  res.send(req.headers);
});



app.listen(3000, function(){
  console.log("Running server on 3000");
});
