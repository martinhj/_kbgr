var io = require('socket.io-client')('http://localhost:8080');
var socket = io.connect();

socket.on('connect', function() {

}
/*
socket.on('connect', function() {
  socket.on('event', function(data) {});
  socket.on('disconnect', function() {});
});
*/