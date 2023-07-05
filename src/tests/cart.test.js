const request = require('supertest')
const app = require('../app');
const Product = require('../models/Product');
require('../models')

const BASE_URL = "/api/v1/cart"
const BASE_URL_USER = "/api/v1/users/login"
let TOKEN ;
let product;
let userId;
let cartId;

beforeAll(async()=>{
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

test("POST -> 'BASE_URL', should return code 201 and res.body.cuantity == body.quantity", async()=> {

    const productBody = {
        title: "Xiaomi",
        description: "Mobile Xiaomi",
        price: 99.99,
    }

    product = await Product.create(productBody)

    const cartbody ={
        quantity: 1,
        userId,
        productId:product.id
    }

    const res = await request(app)
    .post(BASE_URL)
    .send(cartbody)
    .set("Authorization", `Bearer ${TOKEN}`)

    cartId = res.body.id
    expect(res.status).toBe(201)
    expect(res.body.quantity).toBe(cartbody.quantity)
})

test("GET -> 'BASE_URL', should return code 200 and res.body.length == 1", async()=> {
    const res = await request(app)
    .get(BASE_URL)
    .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
})


test("PUT -> 'BASE_URL', should return code 200 and res.body.cuantity == body.quantity", async()=> {

    const cartbody ={
        quantity: 2,
    }

    const res = await request(app)
    .put(`${BASE_URL}/${cartId}`)
    .send(cartbody)
    .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body.quantity).toBe(cartbody.quantity)
})

test("DELETE -> 'BASE_URL', should return code 204", async()=> {
    const res = await request(app)
    .delete(`${BASE_URL}/${cartId}`)
    .set("Authorization", `Bearer ${TOKEN}`)
    
    expect(res.status).toBe(204)
    
    await product.destroy()
})