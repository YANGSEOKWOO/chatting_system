const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
// Listen for incoming connections from clients
io.on('connection', (socket) => {
    console.log('a user connected');
  
    // Listen for chat messages
    socket.on('chatMessage', (message) => {
      console.log('message: ' + JSON.stringify(message));
      io.emit('chatMessage', message);
    });
  
    // Listen for disconnections
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
