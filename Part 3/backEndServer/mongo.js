const mongoose = require("mongoose");

const password = process.argv[2];
const name = process.argv[3];
const numberr = process.argv[4];
const url = `mongodb+srv://jovel:${password}@cluster0.e45vozq.mongodb.net/phoneBook?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
  mongoose
    .connect(url)
    .then((res) => {
      Person.find({})
        .then((persons) => {
          console.log("Phonebook:");
          persons.forEach((person) => {
            console.log(`${person.name}, ${person.number}`);
          });
          return;
        })
        .then((res) => {
          //console.log("here");
          return mongoose.connection.close;
        })
        .then((res) => process.exit(1))
        .catch((err) => {
          console.log(err);
          process.exit(1);
        });
    })
    .catch((err) => console.log(err));
} else {
  mongoose.connect(url).then((result) => {
    console.log("connected");

    const person = new Person({
      name: name,
      number: numberr,
    });

    return person
      .save()
      .then((res) => {
        console.log(`Added ${name} number ${numberr} to phonebook `);
        return mongoose.connection.close();
      })
      .catch((err) => console.log(err));
  });
}
