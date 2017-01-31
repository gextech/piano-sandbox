var fs = require('fs');
var uuidV1 = require('uuid/v1');
var persistPath =  __dirname + "/users.json";
var users ;

process.on('SIGINT', function SIGINT() {
  console.log('Setting save on ->:' + persistPath);
  console.log('Goodbye!');
  fs.writeFile(persistPath, JSON.stringify(users), 'utf8', function handleError(error) {
    console.log('trying to save', JSON.stringify(users));
    if (error != null) {
      console.error('Error unable to save', error);
    } else {
      console.log('Settings saved on ' + persistPath);
    }
    process.exit();
  });
});


var readDataFn = function fnReadData(path) {
  if (users) {
    return users
  }
  console.log('Trying to read data from', path);
  var exist = fs.existsSync();
  if (!exist) {
    console.log('File doesn\'t exist creating empty');
    users = {};
  }
  var data = fs.readFileSync(path, 'utf8');

  console.log('Data length: %d, content: %j', data.length, data);

  try{
    users = JSON.parse(data);
    console.log('Using data from file', users);
  }catch(e){
    console.log('Data from file was INVALID creating empty');
    users = {};
  }



};

readDataFn(persistPath);



module.exports = {
   getUser: function(username){
    return users[username]
  },
  createUser: function (username, email) {

      users[username] = {"id": uuidV1(), "email": email};

      return users[username];
  }

};
