const Contact = ({ name , number, id, handleDelete}) => {
  //console.log(name, number)
    return (
      <h3>{`Name: ${name} Number: ${number}`} <button onClick={() => handleDelete(name,id)}>Delete person</button></h3>
    )
  }
  
  export default Contact;