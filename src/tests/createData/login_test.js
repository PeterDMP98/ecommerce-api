const request = require('supertest')
const app = require('../../app')

const loginUserTest = async ({ulr}) => {
    let TOKEN;

    const user = {
        email: "peter.dmp.ca@gmail.com",
        password: "123456",
    }

    const res = await request(app)
        .post(BASE_URL_USER)
        .send(user)


    return TOKEN = res.body.token
}

module.exports = loginUserTest