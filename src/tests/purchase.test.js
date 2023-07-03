const request = require('supertest')
const app = require('../app')
const Product = require('../models/Product')
const Cart = require('../models/Cart')
const Purcharse = require('../models/Purchase')
require('../models')
const BASE_URL = "/api/v1/purchase"
const BASE_URL_USER = "/api/v1/users/login"
let TOKEN;
let purchaseId
let userId;
let product;


beforeAll(async () => {
    const user = {
        email: "peter.dmp.ca@gmail.com",
        password: "123456",
    }

    const res = await request(app)
        .post(BASE_URL_USER)
        .send(user)

    TOKEN = res.body.token
    userId = res.body.user.id
})

test("POST -> 'BASE_URL', should return status code 201 and res.body.quantity == body.quantity", async()=> {
    const productBody = {
        title: "Xiaomi",
        description: "Mobile Xiaomi",
        price: 99.99
    }

    product = await Product.create(productBody)

    const cartBody = {
        quantity: 5,
        userId,
        productId:product.id        
    }

    await Cart.create(cartBody)

    const res = await request(app)
    .post(BASE_URL)
    .set("Authorization", `Bearer ${TOKEN}`)


    expect(res.status).toBe(201)
    expect(res.body[0].quantity).toBe(cartBody.quantity)
})

test("GET -> 'BASE_URL', should return status code 200 and pruchase.body.length === 1", async()=> {
    const res = await request(app)
    .get(BASE_URL)
    .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)

    await product.destroy()
} )