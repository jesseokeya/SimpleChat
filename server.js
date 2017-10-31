const express = require('express');
const path = require('path');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '/build')));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/build/index.html');
});

let connections = 0;
let allUsers = [];
let AllMessages = [];
let newMessages = 0;

io.on('connection', (socket) => {
  connections++;

  socket.on('newUser', (data) => {
    allUsers.push(data.username);
    io.sockets.emit('users', {
      allUsers: allUsers,
      numOfUsers: connections
    });
  });

  io.sockets.emit('users', {
    allUsers: allUsers,
    numOfUsers: connections
  });

  io.sockets.emit('getAllChats', AllMessages);
  io.sockets.emit('newMessages', newMessages);

  socket.on('typing', (data) => {
    io.sockets.emit('typing', data)
  })

  socket.on('message', (data) => {
    AllMessages.push(data);
    io.sockets.emit('getAllChats', AllMessages);
    newMessages++;
    io.sockets.emit('newMessages', newMessages);
  })

});


http.listen(PORT, () => {
  console.log(`listening on *: ${PORT}`);
});
