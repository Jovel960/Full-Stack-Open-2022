const userRouter = require("express").Router();
const User = require("../model/user");
const config = require("../utilits/config");
const { getUsersDb } = require("../utilits/list_helper");
const bcrypt = require("bcrypt");

userRouter.post("/", async (req, res, next) => {
  const { username, name, password } = req.body;
  if (password.length < 3 || username.length < 3 || !username || !password) {
    res.status(400).json({
      error: "Password or Username must be at leat with 3 characters",
    });
  }
  let existUser = await User.findOne({ username });
  if (existUser) {
    res.status(400).json({ error: "Username must be unique" });
  }
  const saltRounds = 10;
  try {
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = new User({
      username: username,
      name: name,
      passwordHash: passwordHash,
    });
    const saveUser = await user.save();
    res.status(201).json(saveUser).end();
  } catch (err) {
    next(err);
  }
});

module.exports = userRouter;
