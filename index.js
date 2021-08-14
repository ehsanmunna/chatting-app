const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});
app.get('/main', (req, res) => {
  res.sendFile(`${__dirname}/js/main.js`);
});


io.on('connection', (socket)=>{
  // socket.broadcast.emit('hi');

  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat message', (msg) => {
    // console.log('message: ' + msg);
    socket.broadcast.emit('chat message', msg);
    socket.emit('chat message', msg);
  });

})

server.listen(3000, () => {
  console.log('listening on *:3000');
});