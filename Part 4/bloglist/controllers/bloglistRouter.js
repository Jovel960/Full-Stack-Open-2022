const blogRouter = require("express").Router();
const Blog = require("../model/bloglist");
const config = require("../utilits/config");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);

  try {
    await blog.save();
    response.status(201).json(result);
  } catch (err) {
    next(err)
  }
});

module.exports = blogRouter;
