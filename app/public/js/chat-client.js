var socket = io();

document.getElementById("form-messages").addEventListener("submit",(e)=>{
    e.preventDefault()
    const messageText = document.getElementById("input-messages").value
    socket.emit("Send message from client to server",messageText)
})

socket.on("Send message from server to client",(messageText)=>{
    console.log("Client: ",messageText)
})