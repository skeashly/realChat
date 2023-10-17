const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path'); 

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Serve static files from the 'public' directory (such as css file)
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
