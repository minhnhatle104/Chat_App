const express = require('express')
const app = express()
const path = require("path")
const http = require("http")
const socketio = require('socket.io')

const publicPathDirectory = path.join(__dirname,"../public");
app.use(express.static(publicPathDirectory))

const server = http.createServer(app)
const io = socketio(server)

let count = 1
const message = "Hello Chat App"

// Khởi tạo kết nối server với client
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.emit("Send count to client",count)
  
  // Nghe sự kiện từ client trả về server
  socket.on("Send event to server",(value)=>{
    count+=value
    socket.emit("Send count to client",count)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


const port = 3000

server.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})