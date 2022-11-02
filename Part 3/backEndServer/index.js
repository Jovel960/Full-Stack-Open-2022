const express = require("express");
const morgan = require("morgan")
const app = express();
app.use(express.json());

let contacts = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const generateId = () => {
  const maxId =
    contacts.length > 0 ? Math.max(...contacts.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.use(morgan('tiny'))

app.get("/api/persons", (request, response) => {
  response.json(contacts);
});

app.get("/info", (request, response) => {
  response.send(
    `<h4>Phone book has info for ${
      contacts.length - 1
    } people</h4> <p>${Date()}</p>`
  );
});

app.get("/api/persons/:id", (request, response) => {
  let id = Number(request.params.id);
  const contact = contacts.find((contact) => contact.id === id);
  if (contact) {
    response.json(contact);
  } else {
    response.statusMessage = "Contact not found";
    response.status(400).json({error:"person not found"}).end();
  }
});

app.post("/api/persons", (request, response) => {
  if (!request.body.name || !request.body.number) {
    return response
      .status(400)
      .json({ error: "Content is missing, please check again" });
  }
  const isFound = contacts.find(
    (contact) => request.body.name === contact.name
  );
  if (isFound) {
    return response.status(400).json({ error: "Must be uniqe name" });
  }

  const contact = {
    name: request.body.name,
    number: request.body.number,
    id: generateId(),
  };

  //console.log(request.body);
  //console.log(contact)
  contacts = contacts.concat(contact);
  response.json(contact);
});

app.delete("/api/persons/:id", (request, response) => {
  let id = Number(request.params.id);
  contacts = contacts.filter((contact) => contact.id !== id);
  response.status(204).end();
});

app.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()
})

app.listen(3001, () => {
  console.log("Running on port 3001");
});
