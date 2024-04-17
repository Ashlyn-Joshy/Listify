const express = require("express");
const router = express.Router();

//to display all projects
router.get("/project", (req, res) => {
  res.render("Project");
});

//to show only one particular project
router.get("/project/:id", (req, res) => {
  res.render("Project/show");
});

module.exports = router;
