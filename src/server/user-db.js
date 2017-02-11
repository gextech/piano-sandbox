/* eslint-disable */
var users;
var fs = require('fs');
var uuidV1 = require('uuid/v1');
var persistPath = __dirname + "/users.json";

process.on('SIGINT', function SIGINT () {
  console.log('Setting save on ->:' + persistPath);
  fs.writeFile(persistPath, JSON.stringify(users), 'utf8', function handleError (error) {
    console.log('trying to save', JSON.stringify(users));
    if (error != null) {
      console.error('Error unable to save', error);
    } else {
      console.log('Settings saved on ' + persistPath);
    }
    console.log('Goodbye!');
    process.exit();
  });
});

var readDataFn = function fnReadData (path) {
  if (users) { return users }
  console.log('Trying to read data from', path);
  try {
    var data = fs.readFileSync(path, 'utf8');
    users = JSON.parse(data);
    console.log('Data length: ', data.length, ' content:\n', users);
  } catch (e) {
    console.log('File doesn\'t exist or data was INVALID, creating empty users-db');
    users = {};
  }
};

readDataFn(persistPath);

module.exports = {
  getUser: function (username){
    return users[username]
  },
  createUser: function (username, email) {
    console.log("Usuario en user-db: " + username + ", email: " + email);
    if (typeof users[username] === 'undefined') {
      console.log("Creando usuario inexistente");
      users[username] = {"id": uuidV1(), "email": email};
    }
    console.log("-------");
    console.log(users[username]);
    return users[username];
  }
};
