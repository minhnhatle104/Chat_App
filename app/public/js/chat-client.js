var socket = io();

document.getElementById("form-messages").addEventListener("submit",(e)=>{
    e.preventDefault()
    const messageText = document.getElementById("input-messages").value
    const acknowledgements = (errors)=>{
        if(errors){
            alert("Text sent invalid content!")
        }else{
            console.log("Send text successfully")
        }
    }
    socket.emit("Send message from client to server",messageText,acknowledgements)
})

socket.on("Send message from server to client",(messageText)=>{
    console.log("Client: ",messageText)
})