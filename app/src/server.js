const express = require('express')
const app = express()
const path = require("path")
const http = require("http")
const socketio = require('socket.io')
const Filter = require("bad-words")

const publicPathDirectory = path.join(__dirname,"../public");
app.use(express.static(publicPathDirectory))

const server = http.createServer(app)
const io = socketio(server)

// Khởi tạo kết nối server với client
io.on('connection', (socket) => {
  
  socket.on("Send message from client to server",(messageText,callback)=>{
    const filter = new Filter()
    if(filter.isProfane(messageText)){
      return callback("Message is not suitable")
    }
    io.emit("Send message from server to client",messageText)
    callback()
  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


const port = 3000

server.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})