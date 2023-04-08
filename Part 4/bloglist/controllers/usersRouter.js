const userRouter = require("express").Router();
const User = require("../model/user");
const config = require("../utilits/config");
const bcrypt = require("bcrypt");

userRouter.post("/", async (req,res,next) => {
    const {username, name, password } = req.body;

    const saltRounds = 10;
    try{
        const passwordHash = await bcrypt.hash(password, saltRounds);
        const user = new User({
            username:username,
            name:name,
            passwordHash:passwordHash
        })
        const saveUser = await user.save()
        console.log(saveUser)
        res.status(201).json(user)
    }
    catch(err) {
        next(err);
    }
    

})

module.exports = userRouter