const express = require('express')
const app = express()
const path = require("path")
const http = require("http")
const socketio = require('socket.io')

const publicPathDirectory = path.join(__dirname,"../public");
app.use(express.static(publicPathDirectory))

const server = http.createServer(app)
const io = socketio(server)

// Khởi tạo kết nối server với client
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


const port = 3000

server.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})