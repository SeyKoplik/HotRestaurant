// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Tables (DATA)
// =============================================================
var tables = [];
var waitlist = [];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/tables", function (req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function (req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

// Displays all tables
app.get("/api/tables", function (req, res) {
  return res.json(tables);
});

app.get("/api/waitlist", function (req, res) {
  return res.json(waitlist);
});

// Create New Tables - takes in JSON input
app.post("/api/tables", function (req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newTable = req.body;

  console.log(newTable);

  if (tables.length < 5) {
    tables.push(newTable);
    res.json(true);
  } else {
    waitlist.push(newTable);
    res.json(false);
  }

 
});

app.post("/api/clear", function (req, res){
  tables = [];
  waitlist = [];

  res.json(true);
})

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
