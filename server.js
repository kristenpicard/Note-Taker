// KRISTEN - AS OF 4/6 THINK THIS HAS ALL CORRECT SERVER ELEMENTS.
// JUST NEED TO ADD CONTROL FLOW IN POST REQUEST
// AND/OR DELETE FUNCTIONALITY

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

// Redirects to index if no routes match
app.get("*", function (req, res) {
  res.redirect("/");
});

// API GET Request

// Sends notes to the db.json file
app.get("/api/notes", (req, res) => res.json(__dirname, "db.json"));

// API POST Requests

app.post("/api/notes", (req, res) => {
  // HERE I NEED TO EDIT CONTROL FLOW
  //   if (tableData.length < 5) {
  //     tableData.push(req.body);
  //     res.json(true);
  //   } else {
  //     waitListData.push(req.body);
  //     res.json(false);
  //   }
});

// POTENTIALLY WHERE I WILL ADD THE DELET FUNCTIONALITY

app.post("/api/clear", (req, res) => {
  // Empty out the arrays of data
  tableData.length = 0;
  waitListData.length = 0;

  res.json({ ok: true });
});

// LISTENER
// The below code effectively "starts" our server

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
