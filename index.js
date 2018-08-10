var express = require('express');
var socket = require('socket.io');

// app setup
var app = express();
var port = process.env.PORT | 3000;
var server = app.listen(port, () => console.log(`Listening to requests on port ${port}`));

// static files
app.use(express.static('public')); // use middleware to serve static files

// socket setup
var io = socket(server);

io.on('connection', socket => {
  console.log(`Made socket connection: ${socket.id}`);

  socket.on('chat', data => {
    io.sockets.emit('chat', data);  // io.sockets refers to all sockets connected
  });

  socket.on('typing', data => {
    socket.broadcast.emit('typing', data); // emits to everyone except the sender
  });
});
