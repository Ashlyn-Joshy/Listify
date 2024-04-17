const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");

//mongoose connection
mongoose.connect("mongodb://127.0.0.1:27017/listify");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const app = express();

app.get("/", (req, res) => {
  res.send("done");
});

const port = 3000;
app.listen(port, () => {
  console.log(`working on ${port}`);
});
