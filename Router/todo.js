const express = require("express");
const router = express.Router();

//to add new todo to the project
router.get("/new/todo", (req, res) => {
  res.send("new todo page");
});

module.exports = router;
