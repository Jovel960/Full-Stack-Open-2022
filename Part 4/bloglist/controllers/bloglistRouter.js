const blogRouter = require("express").Router();
const Blog = require("../model/bloglist");
const config = require("../utilits/config");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogRouter.post("/", async (request, response, next) => {
  if (!request.body.likes) request.body.likes = 0;
  const blog = new Blog(request.body);
  try {
    let res = await blog.save();
    response.status(201).json(res);
  } catch (err) {
    next(err);
  }
});

blogRouter.get("/:id", async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog) res.json(blog);
    else res.status(404).end();
  } catch (err) {
    next(err);
  }
});

blogRouter.delete("/:id", async (req, res, next) => {
  try {
    result = await Blog.findByIdAndDelete(req.params.id);
    res.status(204).json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = blogRouter;
