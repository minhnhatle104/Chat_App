const express = require('express')
const app = express()
const path = require("path")
const http = require("http")

const publicPathDirectory = path.join(__dirname,"../public");
app.use(express.static(publicPathDirectory))

const server = http.createServer(app)

const port = 3000

server.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})