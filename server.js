'use strict';
const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const port = process.env.S_PORT || 5000;

let connections = 0;
let allUsers = [];
let AllMessages = [];
let newMessages = 0;

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
  res.send('./build/index.html');
})

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

server.listen(port, () => {
  console.log(`Server running on ${port}...`)
})
