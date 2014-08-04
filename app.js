var http = require('http');
var socket = require('socket.io');
var app = require('express');
var server = http.createServer(app);

var io = socket.listen(server);

/**
 * On incoming connection.
 */
io.on('connection', function(client) {
  console.log("Some connection...");



  /**
   * Welcome message
   */
  client.emit('messages', { hello: 'Connceted!' });



  /**
   * Join
   */
  client.on('join', function(name) {
    client.name = name;
    console.log(client.name.name 
      + ' connected (with id: ' + client.name.id + ')...');
    client.emit('messages', 
      { hello: 'You have joined as ' + client.name.name });
  });




  /**
   * Incoming message
   */
  client.on('messages', function(data) {
    console.log(data);
  });



  /**
   * Incoming rfid read.
   */
  client.on('read', function(data) {
    client.emit('messages', { hello: 'Received read.' });
    console.log("data from read: " + JSON.stringify(data));
    for (connection in io.sockets.connected) {
      var kaiId = io.sockets.connected[connection].name.id;
      if (kaiId === data.kaiId) {
        
        var kaiRoom = io.sockets.connected[connection].id; 

        var l = kaiGlasses.length;
        for (var i = 0; i < l; i++) {
          if (kaiGlasses[i].kaiReadId === data.kaiRead) {
            console.log('Found object: ' + JSON.stringify(kaiGlasses[i]));
            console.log('Sending ' + kaiGlasses[i].kaiURL + ' to '
              + io.sockets.connected[connection].name.name
              + ' (kaiId: ' + data.kaiId + ').' );
            io.to(kaiRoom).emit('goggleRead', { kaiURL: kaiGlasses[i].kaiURL});
            break;
          }
        }
        client.emit('messages', { hello: 'Sent read further' });
        break;
      }
    }
  });



});


var kaiGlasses = [
{ kaiReadId: 0,
  kaiURL: 'shut-up-keep-talking-847'
},
{ kaiReadId: 1,
  kaiURL: 'twoway-808'
}];



server.listen(8080);