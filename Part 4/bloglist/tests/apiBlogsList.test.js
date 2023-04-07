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

test("post new blog", async () => {
  const newBlog = {
    title: "N12",
    author: "Dani Kushmaru",
    url: "mako.co.il",
    likes: 15,
  }
  await api.post("/api/blogs").send(newBlog).expect(201);
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(initialBlogs.length + 1);
  expect(response.body[response.body.length -1].title).toBe('N12')
})

test("post a blog without likes property", async () => {
  const newBlog = {
    title: "N12",
    author: "Dani Kushmaru",
    url: "mako.co.il",
  }
  await api.post("/api/blogs").send(newBlog).expect(201);
  const res = await api.get("/api/blogs");
  let blogsArr = res.body.map(blog => blog);
  expect(blogsArr[blogsArr.length -1 ].likes).toBe(0);
})

test("Post a blog without url or title", async () => {
   const newBlog = {
    title: "N12",
    author: "Dani Kushmaru",
  }
  await api.post("/api/blogs").send(newBlog).expect(400);
    const newBlog2 = {
    author: "Dani Kushmaru",
    url: "mako.co.il",
  }
    await api.post("/api/blogs").send(newBlog2).expect(400);
})

test("delete exist blog", async () => {
  const res = await api.get("/api/blogs");
  let blogsArr = res.body.map(element => element);
  await api.delete(`/api/blogs/${blogsArr[0].id}`).expect(204);
  const res2 = await api.get("/api/blogs");
  expect(res2.body).toHaveLength(initialBlogs.length -1 )
})

afterAll(async () => {
  await mongoose.connection.close();
});
