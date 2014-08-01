var http = require('http');
var socket = require('socket.io');
var app = require('express');
var server = http.createServer(app);

var io = socket.listen(server);

io.on('connection', function(client) {
  console.log("Some connection...");
  //console.log(io.sockets.connected); 



  /**
   * Welcome message
   */
  client.emit('messages', { hello: 'world' });



  /**
   * Join
   */
  client.on('join', function(name) {
    //client.set('nickname', name);
    client.name = name;
    console.log(client.name);
    console.log(client.name.name + ' connected...');
    for (test in io.sockets.connected) {
      console.log("\n\n\n<<<<<<<<>>>>>>>");
      console.log(test);
      if (typeof(io.sockets.connected[test].name) !== 'undefined') {
        console.log(io.sockets.connected[test].name);
        console.log(io.sockets.connected[test].name.name);
        console.log(io.sockets.connected[test].name.id);
        var kaiId = io.sockets.connected[test].name.id;
        console.log(io.sockets.connected[test].rooms);
        var kaiRoom = io.sockets.connected[test].rooms[0];
        if (kaiId === 0) {
          io.to(kaiRoom).emit('messages', { hello: 'room' });
        }
      } else {
        console.log("Not yet set....");
      }
    }
    //console.log(io.sockets.connected);
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
    console.log(data);
    for (test in io.sockets.connected) {
      console.log('for loop test');
      var kaiId = io.sockets.connected[test].name.id;
      console.log('local kaiId: ' + kaiId);
      console.log('received kaiId: ' + data.kaiId);
      if (kaiId === data.kaiId) {
        // change this line to send to right room based on hash
        // affiliated with the id
        var kaiRoom = io.sockets.connected[test].rooms[0]; 
        io.to(kaiRoom).emit('messages', { hello: data.kaiRead });
        client.emit('messages', { hello: 'Sent read further' });
      }
    }
    client.emit('messages', { hello: 'Received read.' });
  });


  /**
   * Incoming object
   */
  client.on('binocleId', function(data) {
    console.log(data);
    console.log("> " + data.name);
    // send data to tablet browser here
  });



  /**
   * Incoming string object
   */
  client.on('stringObject', function(data) {
    console.log(JSON.parse(data));
  });
});


server.listen(8080);