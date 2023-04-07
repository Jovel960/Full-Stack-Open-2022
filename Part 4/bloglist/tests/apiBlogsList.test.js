const supertest = require("supertest");
const Blog = require("../model/bloglist");
const mongoose = require('mongoose') 
const app = require("../app");

const api = supertest(app);

const initialBlogs = [
  {
    title:"Biggest rappers in the world",
    author:"Biggie",
    url:"",
    likes:15
  },
  {
    title:"The next israeli war",
    author:"Amit Atzmon",
    url:"",
    likes:30
  }
]

beforeEach(async () => {
  await Blog.deleteMany({});

  let firstBlog = new Blog(initialBlogs[0]);
  await firstBlog.save();

  let secondBlog = new Blog(initialBlogs[1]);
  await secondBlog.save();
})

test('blogs are returned as json', async () => {
 const response = await api.get('/api/blogs')
    console.log(response)
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
}, 10000)

afterAll(async () => {
  await mongoose.connection.close()
},)