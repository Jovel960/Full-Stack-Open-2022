import { useEffect, useState } from "react";
import Contact from "./components/Contact";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import axios from "axios";
import backEndServices from "./Services/Contacts";
const App = () => {
  const [contacts, setContacts] = useState([]);
  const [contact, setContact] = useState({ name: "", number: "", id: null });
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(false);

  useEffect(() => {
    //console.log("effect");
    backEndServices
      .getAll("http://localhost:3001/persons")
      .then((contacts) => setContacts(contacts));
    // axios
    //   .get("http://localhost:3001/persons")
    //   .then((res) => {
    //     //console.log(res.data);
    //     setContacts(res.data);
    //   })
    //   .catch((err) => console.log(err));
  }, []);

  const listToShow = filter
    ? contacts.filter((element) => element.name.includes(search))
    : contacts;

  const handleSubmit = (event) => {
    event.preventDefault();
    //console.log(event.target);
    let newContact;
    let foundC;
    contacts.length === 0
      ? (newContact = { name: contact.name, number: contact.number, id: 0 })
      : (newContact = {
          name: contact.name,
          number: contact.number,
          id: contacts[contacts.length - 1].id + 1,
        });
    const isFound = contacts.find(
      (contactE) => contactE.number === newContact.number
    );
    let isExists = contacts.find(
      (contactE) => contactE.name === newContact.name
    );

    if (isExists) {
      let refChange = contacts.filter(
        (contactE) => contactE.name === newContact.name
      );
      console.log(refChange);
      if (
        window.confirm(
          `${refChange[0].name} is already added to phonebook, replace the old number with the new one ?`
        )
      ) {
        refChange[0].number = newContact.number;
        backEndServices
          .updateContact("http://localhost:3001/persons", refChange[0])
          .then((updatedContact) =>
            setContacts(
              contacts.map((contact) =>
                contact.id !== updatedContact.id ? contact : updatedContact
              )
            )
          );
      }
      refChange = null;
      return;
    }
    if (!isFound) {
      backEndServices
        .addContact("http://localhost:3001/persons", newContact)
        .then((person) => setContacts(contacts.concat(person)));
      // axios
      //   .post("http://localhost:3001/persons", newContact)
      //   .then((res) => setContacts(contacts.concat(newContact)))
      //   .catch((err) => console.log(err));
    } else {
      alert(`${newContact.number} is already added to phonebook`);
    }
    setContact({ name: "", number: "", id: null });
  };
  const handleNameChange = (event) => {
    //console.log("this is event", event.target.value);
    let refContact = {
      name: event.target.value,
      number: contact.number,
      id: null,
    };
    setContact(refContact);
  };
  const handleNumberChange = (event) => {
    //console.log("this is numebr", event.target.value);
    let refContact = {
      name: contact.name,
      number: event.target.value,
      id: null,
    };
    setContact(refContact);
    //console.log("this is ref number", refContact);
  };
  const handleFilter = (event) => {
    setSearch(event.target.value);
    if (event.target.value !== " ") {
      setFilter(true);
    } else {
      setFilter(false);
    }
  };
  const handleDelete = (name, id) => {
    //console.log(id)
    const newList = contacts.filter((contact) => contact.id !== id);
    if (window.confirm(`Do you really want to delete ${name} from the list?`)) {
      backEndServices
        .deleteContact("http://localhost:3001/persons", id)
        .then((res) => setContacts(newList));
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} search={search} />
      <br />
      <h2>Add a new</h2>
      <PersonForm
        contact={contact}
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers and names</h2>
      <div>
        {listToShow.map((element) => (
          <Contact
            name={element.name}
            number={element.number}
            key={element.id}
            handleDelete={handleDelete}
            id={element.id}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
