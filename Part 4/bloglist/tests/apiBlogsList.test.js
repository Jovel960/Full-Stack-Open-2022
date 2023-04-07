const supertest = require("supertest");
const Blog = require("../model/bloglist");
const mongoose = require('mongoose') 
const app = require("../app");

const api = supertest(app);

test('blogs are returned as json', async () => {
 const response = await api.get('/api/blogs')
    console.log(response)
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
}, 10000)

afterAll(async () => {
  await mongoose.connection.close()
},)