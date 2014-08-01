var io = require('socket.io-client')('http://localhost:8080');
var socket = io.connect();



var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});





socket.on('connect', function(data) {



  rl.question("What goggle do you want to test? ", function (answer) {
    var answerTest = {};
    answerTest.answer = parseInt(answer, 10);
    console.log(answerTest);
    rl.close();
  });


      var nickname = {
        name: '',
        id: 0
        };

      nickname.name = 'a';
      nickname.id = 3;

      
      socket.emit('join', nickname);


      var readObject = {
        kaiId: 0,
        kaiRead: 'aaa1'
      };
      socket.emit('read', readObject);


      readObject = {
        kaiId: 1,
        kaiRead: 'aba1'
      };
      socket.emit('read', readObject);
  

      readObject = {
        kaiId: 0,
        kaiRead: 'bbb1'
      };
      socket.emit('read', readObject);


      });



  socket.on('messages', function (data) {
      console.log(data.hello);
      });
/*
socket.on('connect', function() {
  socket.on('event', function(data) {});
  socket.on('disconnect', function() {});
});
*/