// Dependencies

const express = require("express");
const path = require("path");
const fs = require("fs");

// Sets up the Express App

const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

// ROUTING

// => HTML GET Requests
// Below code handles when users "visit" a page.
// In each of the below cases the user is shown an HTML page of content

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// If no matching route is found default to original landing page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// API GET Request

// Sends notes to the db.json file
app.get("/api/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "db.json"), "utf8", (err, jsonString) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
    res.json(JSON.parse(jsonString));
  });
});

///// PSA this has to be below all other app.get methods or it will run every time
// Redirects to index if no routes match
app.get("*", function (req, res) {
  res.redirect("/");
});

// API POST Requests

app.post("/api/notes", (req, res) => {
  fs.readFile(
    path.join(__dirname, "db.json"),
    "utf8",
    function (error, response) {
      if (error) {
        console.log(error);
      }
      const note = JSON.parse(response);
      const noteReq = req.body;
      const newNoteId = note.length + 1;
      const newNote = {
        id: newNoteId,
        title: noteReq.title,
        text: noteReq.text,
      };
      note.push(newNote);
      res.json(newNote);
      fs.writeFile(
        path.join(__dirname, "db.json"),
        JSON.stringify(note, null, 2),
        function (err) {
          if (err) throw err;
        }
      );
    }
  );
});

// LISTENER
// The below code effectively "starts" our server

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
