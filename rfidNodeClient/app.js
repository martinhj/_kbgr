var io = require('socket.io-client')('http://localhost:8080');
var socket = io.connect();



// set information to read keyboard input
var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
// set the term Prompt
rl.setPrompt('kaiTERM> ');



// connect event.
socket.on('connect', function(data) {



  var nickname = {
    name: 'paranoidAndroid',
    id: 3
  };


  socket.emit('join', nickname);



}); // end connect



/**
 * What to do with a message
 */
socket.on('messages', function (data) {
  console.log("\n> " + data.hello);
  rl.prompt();
});



/**
 * Different objects to send to the server.
 * kaiId is the 'tablets' id, the rfid reader would be configured with the
 * one corresponding to the one on the tablet.
 */
readObjects = [];
readObjects.push({
  kaiId: 0,
  kaiRead: 0
});
readObjects.push({
  kaiId: 0,
  kaiRead: 1
});



/**
 * When sending a line from the keyboard to the app.
 */
rl.on('line', function(line) {
  switch(line.trim()) {
    case '0':
      socket.emit('read', readObjects[0]);
      break;
    case '1':
      socket.emit('read', readObjects[1]);
      break;
    default:
      whichObjects();
  }
  rl.prompt();
});


function whichObjects() {
  console.log('Simulate different reads and send it to the server.');
  for (var i = 0, l = readObjects.length; i < l; i++) {
    console.log('Press \'' + i + '\' for ' + JSON.stringify(readObjects[i]));
  }
}