const blogRouter = require("express").Router();
const Blog = require("../model/bloglist");
const config = require("../utilits/config");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogRouter.post("/", async (request, response, next) => {
  if (!request.body.url || !request.body.title) {
    response.status(400).end();
  }
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

blogRouter.put("/:id", async (req, res, next) => {
  console.log(req.body);
  if (!req.body.url || !req.body.title) {
    res.status(400).end();
  } else {
    const body = req.body;
    const blog = {
      author: body.author,
      title: body.title,
      url: body.url,
      likes: body.likes,
    };
    try {
      let result = await Blog.findByIdAndUpdate(req.params.id, blog, {new: true});
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  }
});

module.exports = blogRouter;
