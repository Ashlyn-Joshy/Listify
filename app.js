const express = require("express");
const ejs = require("ejs");
const path = require("path");
const mongoose = require("mongoose");
const engine = require("ejs-mate");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");

const ExpressError = require("./ErrorHandling/expressError");
const todoRouter = require("./Router/todo");
const projectRouter = require("./Router/project");

//mongoose connection
mongoose.connect("mongodb://127.0.0.1:27017/listify");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const app = express();

// use ejs-locals for all ejs templates:
app.engine("ejs", engine);

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(flash());
app.use(express.static(path.join(__dirname, "Public")));

//session config
const sessionConfig = {
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: true,
};

app.use(session(sessionConfig));
// Middleware to flash message
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.warning = req.flash("warning");
  next();
});

//home page
app.get("/", (req, res) => {
  res.render("home");
});
app.use("/", todoRouter);
app.use("/", projectRouter);

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
