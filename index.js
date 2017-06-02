var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/inscription', function(req, res){
  res.sendFile(__dirname + '/inscription.html');
});

userName = "Test";
userConnected = "New user connected";
userDisconnected = "User disconnected";

io.on('connection', function(socket){
    io.emit('chat message', userConnected);
  socket.on('chat message', function(message){
    io.emit('chat message', userName + " : " + message);
  });
   socket.on('disconnect', function () {
    io.emit('chat message', userDisconnected);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});