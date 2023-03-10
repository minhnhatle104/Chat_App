var socket = io();

document.getElementById("form-messages").addEventListener("submit", (e) => {
    e.preventDefault()
    const messageText = document.getElementById("input-messages").value
    const acknowledgements = (errors) => {
        if (errors) {
            alert("Text sent invalid content!")
        } else {
            console.log("Send text successfully")
        }
    }
    socket.emit("Send message from client to server", messageText, acknowledgements)
})

document.getElementById("btn-share-location").addEventListener("click", (e) => {
    e.preventDefault()
    if (!navigator.geolocation) {
        return alert("This browser doesn't support share location")
    }
    navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords
        socket.emit("Share location from client to server", { latitude, longitude })
    })
})

socket.on("Send message from server to client", (message) => {
    console.log("Client: ", message)
    
    const checkIsSend = socket.id === message.userId ? "check_is_send" : ""
    const userName = checkIsSend === "" ? message.username : "Me"

    let contentHTML = document.getElementById("app__messages").innerHTML
    // Hiển thị giao diện lên màn hình
    let messageHTML = `
            <div class="message-item ${checkIsSend}">
            <div class="message__row1">
            <p class="message__name">${userName}</p>
            <p class="message__date">${message.createAt}</p>
            </div>
            <div class="message__row2">
            <p class="message__content">
                ${message.messagesText}
            </p>
            </div>
        </div>
    `
    let contentRender = contentHTML + messageHTML

    document.getElementById("app__messages").innerHTML = contentRender
})

socket.on("Share location from server to client", (message) => {
    console.log("Location: ", message)

    const checkIsSend = socket.id === message.userId ? "check_is_send" : ""
    const userName = checkIsSend === "" ? message.username : "Me"

    let contentHTML = document.getElementById("app__messages").innerHTML
    // Hiển thị giao diện lên màn hình
    let messageHTML = `
            <div class="message-item ${checkIsSend}">
            <div class="message__row1">
            <p class="message__name">${userName}</p>
            <p class="message__date">${message.createAt}</p>
            </div>
            <div class="message__row2">
            <p class="message__content">
                <a href="${message.messagesText}" target="_blank">${message.username}'s current location</a>
            </p>
            </div>
        </div>
    `
    let contentRender = contentHTML + messageHTML

    document.getElementById("app__messages").innerHTML = contentRender
})

// Xử lý query string
const queryString = location.search
const params = Qs.parse(queryString, {
    ignoreQueryPrefix: true
})
const { room, username } = params

socket.emit("join room from client to server", { room, username })
// hiển thị tên phòng lên giao diện
document.getElementById("app__title").innerHTML = room

// Nhận user list từ server
socket.on("send user list from server to client", (userList) => {
    console.log(userList)
    let contentHTML = ""
    userList.map((user) => {
        contentHTML += `
            <li class="app__item-user">${user.username}</li>   
        `
    })
    document.getElementById("app__list-user--content").innerHTML = contentHTML
})