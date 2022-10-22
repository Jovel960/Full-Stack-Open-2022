import { useState } from "react";
import Name from "./components/Name";
const App = () => {
  const [names, setNames] = useState([]);
  const [name, setName] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    //console.log(event.target);
    let newName;
    names.length === 0
      ? (newName = { nickname: name, id: 1 })
      : (newName = { nickname: name, id: names[names.length - 1].id + 1 });
    const isFound = names.find((name) => name.nickname === newName.nickname);
    //console.log(isFound);
    isFound === undefined
      ? setNames(names.concat(newName)) && setName("")
      : alert(`${newName.nickname} is already added to phonebook`);
    console.log(names);
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
          <Name name={element.nickname} key={element.id} />
        ))}
      </div>
    </div>
  );
};

export default App;
