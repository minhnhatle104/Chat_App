const userList = [
    {
        id:"1",
        username:"Ben White",
        room :"fe02",
    },
    {
        id:"2",
        username:"Casemiro",
        room:"fe01",
    }
]

const getUserList = (room) => userList.filter(user => user.room === room)

module.exports = {
    getUserList,
}