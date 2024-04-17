const express = require("express");
const router = express.Router();

const Project = require("../Model/Project");

//to display all projects
router.get("/project", async (req, res) => {
  const project = await Project.find({});
  res.render("Project", { project });
});

//to add a new project
router.get("/project/new", (req, res) => {
  res.render("Project/new");
});
router.post("/project", async (req, res) => {
  const project = await new Project(req.body);
  await project.save();
  res.redirect(`/project`);
});

//to show only one particular project
router.get("/project/:id", (req, res) => {
  res.render("Project/show");
});

module.exports = router;
