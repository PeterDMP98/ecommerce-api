const request = require('supertest')
const app = require('../app')
require('../models')
const BASE_URL = "/api/v1/products"
const BASE_URL_USER = "/api/v1/users/login"
const login = require('../utils/login_test')
const Category = require('../models/Category')
let TOKEN;
let productId;
let category;

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

    const categoryBody ={
        name: "Tech"
    }

    category = await Category.create(categoryBody)

    const product = {
        title: "Xiaomi",
        description: "Mobile Xiaomi",
        price: 99.99,
        categoryId: category.id
    }

    const res = await request(app)
    .post(BASE_URL)
    .send(product)
    .set("Authorization", `Bearer ${TOKEN}`)

    productId = res.body.id
    expect(res.status).toBe(201)
    expect(res.body.title).toBe(product.title)
})

test("GET -> 'BASE_URL?category = category.id', should return status 200, res.body.length == 1 and res.body[0] to be defined", async () => {
    const res = await request(app)
    .get(BASE_URL)

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
    //expect(res.body[0].category).toBeDefined()
})

test("GET FILTER -> 'BASE_URL', should return status 200, res.body.length == 1 and res.body[0] to be defined", async () => {
    
    const res = await request(app)
        .get(`${BASE_URL}?category=${category.id}`)

    console.log(res.body);
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
    //expect(res.body[0].category).toBeDefined()
})

test("GET ONE -> 'BASE_URL/:id', should return status 200 and res.body.length == 1", async () => {
    const res = await request(app)
    .get(`${BASE_URL}/${productId}`)

    expect(res.status).toBe(200)
    expect(res.body.title).toBe("Xiaomi")
    //expect(res.body[0].category).toBeDefined()
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
    await category.destroy()
})