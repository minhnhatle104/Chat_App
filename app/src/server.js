const express = require('express')
const app = express()
const path = require("path")
const http = require("http")
const socketio = require('socket.io')
const Filter = require("bad-words")
const { createMessages } = require('./utils/create-messages')
const { getUserList } = require('./utils/users')

const publicPathDirectory = path.join(__dirname, "../public");
app.use(express.static(publicPathDirectory))

const server = http.createServer(app)
const io = socketio(server)

// Khởi tạo kết nối server với client
io.on('connection', (socket) => {

 
  socket.on("join room from client to server",({room,username})=>{
    socket.join(room)

    // Welcome
    socket.emit("Send message from server to client", `Welcome to cyberchat, room ${room}`)
    socket.broadcast.to(room).emit("Send message from server to client",
      createMessages(`${username} enters chat room`)
    )
  
    // Chat
    socket.on("Send message from client to server", (messageText, callback) => {
      const filter = new Filter()
      if (filter.isProfane(messageText)) {
        return callback("Message is not suitable")
      }
  
      io.to(room).emit("Send message from server to client", createMessages(messageText))
      callback()
    })
  
    socket.on("Share location from client to server", ({ latitude, longitude }) => {
      const linkLocation = `https://www.google.com/maps?q=${latitude},${longitude}`
      io.to(room).emit("Share location from server to client", createMessages(linkLocation))
    })

    // Xử lý userList
    io.to(room).emit("send user list from server to client",getUserList(room))
  
  })

  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


const port = 3000

server.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})