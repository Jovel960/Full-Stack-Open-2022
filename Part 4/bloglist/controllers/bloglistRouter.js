const blogRouter = require("express").Router();
const Blog = require("../model/bloglist");
const config = require("../utilits/config");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const middleware = require("../utilits/middleware");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { name: 1, id: 1 });
  response.json(blogs);
});

blogRouter.post(
  "/",
  middleware.userExtractor,
  async (request, response, next) => {
    if (!request.body.url || !request.body.title) {
      response.status(400).end();
    }
    // const decodedToken = jwt.verify(request.token, process.env.SEKRET);
    // if (!decodedToken) {
    //   return response.status(401).json({ error: "invalid token" });
    // }
    if (!request.body.likes) request.body.likes = 0;
    let body = request.body;
    try {
      let user = await User.findById(request.user.id);

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
  }
);

blogRouter.get("/:id", async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog) res.json(blog);
    else res.status(404).end();
  } catch (err) {
    next(err);
  }
});

blogRouter.delete("/:id", middleware.userExtractor, async (req, res, next) => {
  if (!req.token) {
    return res.status(401).json({ error: "Not authorized" });
  }
  try {
    let token = await jwt.verify(req.token, process.env.SEKRET);
    let findUser = await User.findById(token.id);
    let findBlog = await Blog.findById(req.params.id);
     if (findUser._id.toString() !== findBlog.user._id.toString()) {
      return res
        .status(401)
        .json({ error: "user dont have premission to delete the blog" });
    }
    result = await Blog.findByIdAndDelete(req.params.id);
    res.status(204).json(result);
  } catch (err) {
    next(err);
  }
});

blogRouter.put("/:id", middleware.userExtractor, async (req, res, next) => {
  if (!req.body) {
    return res.status(401).json({ error: "Not authorized" });
  }
  //else if (!req.body.url || !req.body.title) {
  //   return res.status(400).end();
  // }
  else {
    try {
      let findBlog = await Blog.findById(req.params.id);
      let userToken = await jwt.verify(req.token, process.env.SEKRET);
      // let findUser = await User.findById(userToken.id);
      // if (findUser._id.toString() !== findBlog.user._id.toString()) {
      //   return res.status(401).json({ error: "Not authorized" });
      // }
      const body = req.body;
      const blog = {
        author: findBlog.author,
        title: findBlog.title,
        url: findBlog.url,
        likes: findBlog.likes + 1,
        user:findBlog.user
      };
      let result = await Blog.findByIdAndUpdate(req.params.id, blog, {
        new: true,
      });
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
});

module.exports = blogRouter;
