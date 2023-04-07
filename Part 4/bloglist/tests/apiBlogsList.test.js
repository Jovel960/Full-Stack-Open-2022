const supertest = require("supertest");
const Blog = require("../model/bloglist");
const mongoose = require("mongoose");
const app = require("../app");

const api = supertest(app);

const initialBlogs = [
  {
    title: "Biggest rappers in the world",
    author: "Biggie",
    url: "",
    likes: 15,
  },
  {
    title: "The next israeli war",
    author: "Amit Atzmon",
    url: "",
    likes: 30,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  console.log("Deleted all")

  initialBlogs.forEach(async (element, i) => {
    let savedBlog = new Blog(element);
    await savedBlog.save();
  });
  console.log("saved dummy data")
});

test("blogs are returned as json", async () => {
  const response = await api.get("/api/blogs");
  expect(response.status).toBe(200);
  expect(response.body).toHaveLength(2);
}, 10000);

test("verify te id property", async () => {
  const response = await api.get("/api/blogs");
  response.body.map(blog => expect(blog.id).toBeDefined());
})

afterAll(async () => {
  await mongoose.connection.close();
});
