import { useState } from "react";
import Name from "./components/Name";
//Commit task 2.6
const App = () => {
  const id = 0;
  const [names, setNames] = useState([]);
  const [name, setName] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    //console.log(event.target);
    const newName = { nickname: name, id: id + 1 };
    setNames(names.concat(newName));
    setName("");
    //console.log(names);
  };
  const handleChange = (event) => {
    //console.log("this is event", event.target.value);
    setName(event.target.value);
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Name: <input value={name} onChange={handleChange} />
        </div>
        <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      <div>
          {names.map((element) => (
            <Name name={element.nickname} key={name.id} />
          ))}
      </div>
    </div>
  );
};

export default App;
