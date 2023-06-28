const request = require('supertest')
const app = require('../app')
require('../models')
const BASE_URL = "/api/v1/products"
const BASE_URL_USER = "/api/v1/users/login"
let TOKEN;
let productId;

beforeAll(async () => {
    const user = {
        email: "peter.dmp.ca@gmail.com",
        password: "123456",
    }

    const res = await request(app)
        .post(BASE_URL_USER)
        .send(user)

    TOKEN = res.body.token
})

test("POST -> 'BASE_URL', should return status 201 and res.body.title == body.title", async () => {
    const product = {
        title: "Xiaomi",
        description: "Mobile Xiaomi",
        price: 99.99
    }

    const res = await request(app)
    .post(BASE_URL)
    .send(product)
    .set("Authorization", `Bearer ${TOKEN}`)

    productId = res.body.id
    expect(res.status).toBe(201)
    expect(res.body.title).toBe(product.title)
})

test("GET -> 'BASE_URL', should return status 200 and res.body.length == 1", async () => {
    const res = await request(app)
    .get(BASE_URL)
    console.log(res.body);
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
})

test("GET -> 'BASE_URL/:id', should return status 200 and res.body.length == 1", async () => {
    const res = await request(app)
    .get(`${BASE_URL}/${productId}`)

    expect(res.status).toBe(200)
})

test("PUT -> 'BASE_URL/:id', should return status 200 and res.body.title == body.title", async () => {
    const productUpdate = {
        "title": "Xiaomi 10 pro",
    }
    
    const res = await request(app)
    .put(`${BASE_URL}/${productId}`)
    .send(productUpdate)
    .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body.title).toBe(productUpdate.title)
})

test("DELETE -> 'BASE_URL/:id', should return status 204", async () => {
    const res = await request(app)
    .delete(`${BASE_URL}/${productId}`)
    .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.status).toBe(204)
})