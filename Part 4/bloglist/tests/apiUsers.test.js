const app = require("../app");
const supertest = require("supertest");
const mongoose = require("mongoose");
const User = require("../model/user");
const {getUsersDb} = require("../utilits/list_helper");
const bcrypt = require("bcrypt");

const api = supertest(app);

beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = new User({username:"jovel", passwordHash});
    await user.save();
});

test("create user", async () => {
    const usersAtStart = await getUsersDb();

    const user = {username:"jovel", name:"yovel", password: "passwordHash"}

    await api.post("/api/users").send(user).expect(201);
})

