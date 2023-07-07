const express = require("express");
const app = express();
const port = 4000;
app.use(express.json());

// Function from lesson to add id to new records in collection with an id. Called in post handler
function getNextIdFromCollection(collection) {
    if(collection.length === 0) return 1; 
    const lastRecord = collection[collection.length - 1];
    return lastRecord.id + 1;
  }

  // Get the data posted below
app.get("/", (req, res) => {
    res.send(data);
})

app.get("/:id", (req, res) => {
    //ID we're looking for parsed from our URL parameter, with base 10
    const personID = parseInt(req.params.id, 10);                       
    // For every 'person' in 'data', only return the person whose ID matches parameter
    const specificPerson = data.find(person => person.id === personID); 
    // Respond with our specific person with the correct ID
    res.send(specificPerson);                                           
})

// Listen to the running port to start server at intended location
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

app.post("/", (req, res) => {
    // translate the body of the request into local data
    console.log(req.body)
    const newPerson = {
        ...req.body,
        id: getNextIdFromCollection(data)
    }
    console.log(req.body);
    // Push new person into our data
    data.push(newPerson);
    // Respond with our new person
    res.send(newPerson);
})

// "put" handler, to replace entire section of data without updating
app.put("/:id", (req, res) => {
    // Grab ID from params
    const personID = parseInt(req.params.id, 10);
    // find index of person we want to replace
    console.log(personID);
    const personIndex = data.findIndex(person => person.id === personID);
    // New data comes from the request
    const newPerson = {
        ...req.body,
        id: personID
    }
    // replace the index of the previous person with this person
    data[personIndex] = newPerson;
    res.send(newPerson);
})

app.patch("/:id", (req, res) => {
    // Grab ID from params
    const personID = parseInt(req.params.id, 10);
    const personIndex = data.findIndex(person => person.id === personID);
    const updates = req.body;
    // Make a new data piece, first with all of our old data spread out, and then replace the parts that have been updated with the updated data
    const personUpdates = {...data[personIndex], ...updates};
    data[personIndex] = personUpdates;
    // Send the person updates
    res.send(personUpdates);
})

app.delete("/:id", (req, res) => {
    // Get ID, find index
    const personID = parseInt(req.params.id, 10);
    const personIndex = data.findIndex(person => person.id === personID);
    // Delete the index off the data
    data.splice(personIndex, 1);
    // Message send
    res.send({message: "Job Deleted Successfully"});
})

const data = [
    {
        name: "Mandy",
        age: 45,
        id: 1
    },
    {
        name: "Matthew",
        age: 23,
        id: 2
    },
    {
        name: "Melony",
        age: 39,
        id: 3
    }
];