import { useEffect, useState } from "react";
import Contact from "./components/Contact";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import axios from "axios";
const App = () => {
  const [contacts, setContacts] = useState([]);
  const [contact, setContact] = useState({ name: "", number: "", id: null });
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(false);

  useEffect(()=>{
    console.log("effect");
    axios.get("http://localhost:3001/persons").then(res => {
      //console.log(res.data);
      setContacts(res.data)
  }).catch(err => console.log(err))
},[])
      


  const listToShow = filter
    ? contacts.filter((element) => element.name.includes(search))
    : contacts;

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
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} search={search} />
      <br />
      <h2>Add a new</h2>
      <PersonForm contact={contact} handleSubmit={handleSubmit} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers and names</h2>
      <div>
        {listToShow.map((element) => (
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
