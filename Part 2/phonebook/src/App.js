import { useState } from "react";
import Contact from "./components/Contact";
const App = () => {
  const [contacts, setContacts] = useState([]);
  const [contact, setContact] = useState({ name: "", number: "", id: null });
  const handleSubmit = (event) => {
    event.preventDefault();
    //console.log(event.target);
    let newContact;
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
    //console.log(isFound);
    isFound === undefined
      ? setContacts(contacts.concat(newContact))
      : alert(`${newContact.number} is already added to phonebook`);
    //console.log(contact, contacts)
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
    console.log("this is numebr", event.target.value);
    let refContact = {
      name: contact.name,
      number: event.target.value,
      id: null,
    };
    setContact(refContact);
    console.log("this is ref number", refContact);
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Name: <input value={contact.name} onChange={handleNameChange} />
        </div>
        <br />
        <div>
          Number: <input value={contact.number} onChange={handleNumberChange} />
        </div>
        <br />
        <button type="submit">add</button>
      </form>
      <h2>Numbers and names</h2>
      <div>
        {contacts.map((element) => (
          <Contact
            name={element.name}
            number={element.number}
            key={element.id}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
