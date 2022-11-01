const express = require("express");
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

app.get("/api/contacts", (request, response) => {
  response.json(contacts);
});

app.get("/api/contacts/:id", (request, response) => {
  let id = Number(request.params.id);
  const contact = contacts.find((contact) => contact.id === id);
  if (contact) {
    response.json(contact);
  } else {
    response.statusMessage = "Contact not found";
    response.status(400).end();
  }
});

app.post("/api/contacts", (request, response) => {
  if (!request.body) {
    return response.status(400).json({ errpr: "content is missing" });
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

app.delete("/api/contacts/:id", (request, response) => {
  let id = Number(request.params.id);
  contacts = contacts.filter((contact) => contact.id !== id);
  response.status(204).end();
});

app.listen(3001, () => {
  console.log("Running on port 3001");
});
