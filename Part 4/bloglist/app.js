//const http = require('http')
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
//const { response } = require('express')
const logger = require("./utilits/logger");
const config = require("./utilits/config");
//const Blog = require('./model/bloglist');
const blogRouter = require("./controllers/bloglistRouter");
const middleware = require("./utilits/middleware");
const userRouter = require("./controllers/usersRouter");

const mongoUrl = config.MONGODB_URI;
mongoose.set("strictQuery", false);

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });
app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);
app.use(middleware.requestLogger);
app.use(middleware.unKnownEndPoint);

module.exports = app;