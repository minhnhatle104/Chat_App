let userList = [
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
const addNewUser = (newUser) => userList = [...userList,newUser]
const getUserList = (room) => userList.filter(user => user.room === room)

module.exports = {
    getUserList,
    addNewUser,
}