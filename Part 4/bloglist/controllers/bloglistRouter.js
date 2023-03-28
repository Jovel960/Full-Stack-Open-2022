const blogRouter = require('express').Router();
const Blog = require('../model/bloglist');
const config = require('../utilits/config')

// blogRouter.get("/", (req,res) => {
//   res.send('<h1>Bloglist</h1>')
// })
blogRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})


module.exports = blogRouter;