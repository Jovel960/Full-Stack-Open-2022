const blogRouter = require("express").Router();
const Blog = require("../model/bloglist");
const config = require("../utilits/config");
const User = require("../model/user");
const jwt = require("jsonwebtoken");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { name: 1, id: 1 });
  response.json(blogs);
});

blogRouter.post("/", async (request, response, next) => {
  if (!request.body.url || !request.body.title) {
    response.status(400).end();
  }
  const decodedToken = jwt.verify(request.token, process.env.SEKRET);
  if (!decodedToken) {
    return response.status(401).json({ error: "invalid token" });
  }
  if (!request.body.likes) request.body.likes = 0;
  let body = request.body;

  try {
    let user = await User.findById(decodedToken.id);

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id,
    });
    let savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    console.log(user.blogs, savedBlog);
    await user.save();
    response.status(201).json(savedBlog);
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
      let result = await Blog.findByIdAndUpdate(req.params.id, blog, {
        new: true,
      });
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  }
});

module.exports = blogRouter;
