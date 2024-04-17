const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const engine = require("ejs-mate");

//mongoose connection
mongoose.connect("mongodb://127.0.0.1:27017/listify");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const app = express();

app.use(express.urlencoded({ extended: true }));
// use ejs-locals for all ejs templates:
app.engine("ejs", engine);

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

//router for todo
app.get("/todo", (req, res) => {
  res.render("todo");
});

const port = 3000;
app.listen(port, () => {
  console.log(`working on ${port}`);
});
