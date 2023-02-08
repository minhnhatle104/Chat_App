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

const removeUser = (id) => userList = userList.filter(user => user.id !== id)

const findUser = (id) => userList.find(user => user.id === id)

module.exports = {
    getUserList,
    addNewUser,
    removeUser,
    findUser
}