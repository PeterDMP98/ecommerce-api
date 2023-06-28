const User = require('../../models/User')

const user = async () => {

    const userCreate = {
        firstName: "Pedro",
        lastName: "Caraballo",
        email: "peter.dmp.ca@gmail.com",
        password: "123456",
        phone: "3043583617"
    }

    await User.create(userCreate)
}

module.exports = user