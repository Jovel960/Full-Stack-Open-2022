const loginRouter = require("express").Router();
const User = require("../model/user");
const Blog = require("../model/bloglist");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

loginRouter.post("/", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);
    if (!(passwordCorrect && user)) {
      return res.status(400).json({ error: "invalid username or password" });
    }
    const userForToken = { username: user.username, id: user._id };
    const token = jwt.sign(userForToken, process.env.SEKRET);

    res.status(200).json({ token, username: user.username, name: user.name });
  } catch (err) {
    next(err);
  }
});

module.exports = loginRouter;
