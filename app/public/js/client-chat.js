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

// Xử lý query string
const queryString = location.search
const params = Qs.parse(queryString,{
    ignoreQueryPrefix:true
})
const {room,username} = params

socket.emit("join room from client to server",{room,username})

// Nhận user list từ server
socket.on("send user list from server to client",(userList)=>{
    console.log(userList)
    let contentHTML = ""
    userList.map((user)=>{
        contentHTML += `
            <li class="app__item-user">${user.username}</li>   
        `
    })
    document.getElementById("app__list-user--content").innerHTML = contentHTML
})