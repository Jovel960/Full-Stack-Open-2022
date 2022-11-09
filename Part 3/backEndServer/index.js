const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const { request, response } = require("express");
const app = express();
require("dotenv").config();
const Person = require("./mongoDB/personDB");
app.use(express.json());
app.use(morgan(":method :url :body"));
app.use(cors());
app.use(express.static("build"));

const generateId = () => {
  const maxId =
    contacts.length > 0 ? Math.max(...contacts.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.use(morgan("tiny"));

app.get("/", (request, response) => {
  response.send("ok");
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((res) => {
    response.json(res);
  });
});

app.get("/info", (request, response) => {
  response.send(
    `<h4>Phone book has info for ${
      contacts.length - 1
    } people</h4> <p>${Date()}</p>`
  );
});

app.get("/api/persons/:id", (request, response) => {
  //console.log("params", request.params)
  Person.findById(request.params.id)
    .then((res) => response.json(res))
    .catch((err) => {
      response.statusMessage = "Person not found";
      response.status(404).json({ error: "person not found" }).end();
    });
});

app.post("/api/persons", (request, response) => {
  if (!request.body.name || !request.body.number) {
    return response
      .status(400)
      .json({ error: "Content is missing, please check again" });
  }

  console.log("content", request.body.name, request.body.number);
  const person = new Person({
    name: request.body.name,
    number: request.body.number,
  });

  person
    .save()
    .then((res) => {
      response.json(res);
    })
    .catch((err) => console.log(err));
});

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

app.delete("/api/persons/:id", (request, response) => {
  let id = Number(request.params.id);
  console.log(id);
  Person.findOneAndDelete(id)
    .then((res) => {
      response.statusMessage = "Person deleted successfully !";
      response.status(204).end();
    })
    .catch((err) => {
      response.statusMessage = "Something went wrong";
      response.status(400).end();
    });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
