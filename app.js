const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const engine = require("ejs-mate");

const ExpressError = require("./ErrorHandling/expressError");

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

//home page
app.get("/", (req, res) => {
  res.render("home");
});
//router for todo
app.get("/todo", (req, res) => {
  res.render("todo");
});

//if page is not define
app.get("*", (req, res, next) => {
  next(new ExpressError("page not found", 404));
});
//basic error handler
app.use((err, req, res, next) => {
  const { status = 500 } = err;
  if (!err.message) {
    err.message = "something went wrong";
  }
  res.status(status).render("errorPage", { err });
});

const port = 3000;
app.listen(port, () => {
  console.log(`working on ${port}`);
});
