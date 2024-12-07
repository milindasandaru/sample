/*var Express = require("express");
var cors = require("cors");
var MongoClient = require("monodb").MongoClient;
const multer = require("multer");

var app = Express();
app.use(cors());

var CONNECTION_STRING = "mongodb+srv://sampleProject:hPEyVirZ6JEkRYW@cluster0.2gmtb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

var DATABASE = "todoappdb";
var database;

app.listen(5040, () => {
    MongoClient.connect(CONNECTION_STRING, (error,client) => {
        database = client.db(DATABASE);
        console.log("MongoDB Connection Successful!");
    });
});


app.post('/api/todoapp/AddNotes', multer().none(), (request, response) => {
    database.collection("todoappcollection").count({}, function(error, numOFDocs) {
        database.collection("todoappcollection").insertOne({
            id:(numOFDocs + 1).toString(),
            description:request.body.newNotes
        });
        response.json("Added Successfully!"); 
    });
});

app.delete('/api/todoapp/DeleteNotes', (requets, response) => {
    database.collection("todoappcollection").deleteOne ({
        id:request.query.id
    });
    response.json("Delete Successfully!");
});
*/

const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const multer = require("multer");

const app = express();
app.use(cors());

const CONNECTION_STRING = "mongodb+srv://sampleProject:hPEyVirZ6JEkRYW@cluster0.2gmtb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const DATABASENAME = "todoappdb";

let database;

async function connectToDatabase() {
    try {
        const client = await MongoClient.connect(CONNECTION_STRING);
        database = client.db(DATABASENAME);
        console.log("MongoDB Connection Successful!");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error.message);
        process.exit(1); // Exit the process if the connection fails
    }
}

const PORT = 5040;

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await connectToDatabase();
});

/*app.get('/api/todoapp/GetNotes', (request, response) => {
    database.collection("todoappcollection").find({}).toArray((error, result) => {
        response.send(result);
    });
});*/

app.get('/api/todoapp/getnotes', async (request, response) => {
    try {
        if (!database) {
            return response.status(500).send("Database not initialized.");
        }
        
        // Fetch data from the collection
        const result = await database.collection("todoappcollection").find({}).toArray();
        response.json(result); // Send the result as JSON
    } catch (error) {
        console.error("Error fetching data:", error.message);
        response.status(500).send("Error fetching notes.");
    }
});

// Add a new note
app.post('/api/todoapp/AddNotes', multer().none(), async (request, response) => {
    try {
        const numOfDocs = await database.collection("todoappcollection").countDocuments({});
        
        const newNote = {
            id: (numOfDocs + 1).toString(),
            description: request.body.newNotes
        };

        await database.collection("todoappcollection").insertOne(newNote);
        response.json({ message: "Added Successfully!", note: newNote });
    } catch (error) {
        console.error("Error adding note:", error.message);
        response.status(500).send("Error adding note.");
    }
});

// Delete a note
app.delete('/api/todoapp/DeleteNotes', async (request, response) => {
    try {
        const noteId = request.query.id;

        if (!noteId) {
            return response.status(400).send("Note ID is required.");
        }

        const result = await database.collection("todoappcollection").deleteOne({ id: noteId });

        if (result.deletedCount === 0) {
            return response.status(404).send("Note not found.");
        }

        response.json({ message: "Deleted Successfully!" });
    } catch (error) {
        console.error("Error deleting note:", error.message);
        response.status(500).send("Error deleting note.");
    }
});
