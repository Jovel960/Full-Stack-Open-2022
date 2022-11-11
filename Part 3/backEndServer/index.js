const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const { request, response } = require("express");
const app = express();
require("dotenv").config();
const Person = require("./mongoDB/personDB");
app.use(express.static("build"));
app.use(morgan("tiny"));
app.use(morgan(":method :url :body"));
app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {
  response.send("ok");
});

app.get("/api/persons", (request, response, next) => {
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

app.get("/api/persons/:id", (request, response, next) => {
  //console.log("params", request.params)
  Person.findById(request.params.id)
    .then((res) => {
      if (res) {
        response.json(res);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      next(error);
    });
});

const errorHandler = (error, request, response, next) => {
  const errorType = error.name;
  if (errorType === "CastError") {
    return response.status(400).send({ error: "malformatted information" });
  }
  next(error);
};

app.use(errorHandler);

app.post("/api/persons", (request, response, next) => {
  if (!request.body.name || !request.body.number) {
    return next();
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

const missingInformation = (request, response, next) => {
  if (!request.body.name || !request.body.number) {
    return response
      .status(400)
      .json({ error: "Content is missing, please check again" });
  }
  next();
};

app.use(missingInformation);

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

app.delete("/api/persons/:id", (request, response, next) => {
  let id = Number(request.params.id);
  console.log(id);
  Person.findOneAndDelete(id)
    .then((res) => {
      response.statusMessage = "Person deleted successfully !";
      response.status(204).end();
    })
    .catch((error) => {
      next();
    });
});

const deleteErrorHandler = (request, response) => {
  response.statusMessage = "Something went wrong";
  return response.status(400).end();
};

app.use(deleteErrorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
