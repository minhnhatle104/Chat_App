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

document.getElementById("btn-share-location").addEventListener("click",(e)=>{
    e.preventDefault()
    if(!navigator.geolocation){
        return alert("This browser doesn't support share location")
    }
    navigator.geolocation.getCurrentPosition((position)=>{
        const {latitude,longitude} = position.coords
        socket.emit("Share location from client to server",{latitude,longitude})
    })
})

socket.on("Send message from server to client",(messageText)=>{
    console.log("Client: ",messageText)
})

socket.on("Share location from server to client",(linkLocation)=>{
    console.log("Location: ",linkLocation)
})