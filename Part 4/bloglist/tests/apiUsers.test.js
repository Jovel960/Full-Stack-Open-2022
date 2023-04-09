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
    const user = {username:"jovel1", name:"yovel", password: "passwordHash"}

    await api.post("/api/users").send(user).expect(201).expect('Content-Type', /application\/json/);
    const usersAfter = await getUsersDb();
    expect(usersAfter).toHaveLength(usersAtStart.length + 1)
})

test("create user with a username that exists", async () => {
    const user = {username:"jovel", password:"123456"}
    await api.post("/api/users").send(user).expect(400);
})

