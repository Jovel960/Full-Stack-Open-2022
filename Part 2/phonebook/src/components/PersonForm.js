const PersonForm = ({contact, handleSubmit, handleNameChange,handleNumberChange}) => {
  return (
    <div>
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
    </div>
  );
};

export default PersonForm;
