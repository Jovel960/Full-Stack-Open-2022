const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

console.log("Connecting to ", url);

mongoose
  .connect(url)
  .then((res) => console.log("Connected to mongoDB successfully"))
  .catch((err) => console.log("error connecting to MongoDB:", err.message));

personSchema = mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__V;
  },
});

module.exports = mongoose.model("Person", personSchema);
