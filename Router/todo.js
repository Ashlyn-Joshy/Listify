const express = require("express");
const router = express.Router();

//to add new todo to the project
router.get("/new/todo", (req, res) => {
  res.render("todo/new");
});
router.post("");
module.exports = router;
