var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req,res){
  res.sendFile(__dirname + '/index.html');
});

// on connection...
io.on('connection', function(socket){
  io.emit('chat message','[a user connected]');
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    socket.broadcast.emit('chat message', msg);
  });
  socket.on('typing', function(){
    socket.broadcast.emit('typing');
  });
  socket.on('disconnect', function(){
      io.emit('chat message','[user disconnected]');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
})
