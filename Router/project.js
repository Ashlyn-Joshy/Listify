const express = require("express");
const router = express.Router();

const Project = require("../Model/Project");
const ExpressError = require("../ErrorHandling/expressError");

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
  project.createdDate = new Date();
  await project.save();
  res.redirect(`/project/${project.id}`);
});

//to show only one particular project
router.get("/project/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id).populate("todos");
    res.render("Project/show", { project });
  } catch (error) {
    next(new ExpressError("Project not found", 404));
  }
});

//to edit a particular project
router.get("/project/:id/edit", async (req, res, next) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id);
    res.render("Project/edit", { project });
  } catch (error) {
    next(new ExpressError("Project not found", 404));
  }
});
router.put("/project/:id", async (req, res) => {
  const { id } = req.params;
  const project = await Project.findByIdAndUpdate(id, req.body);
  await project.save();
  res.redirect(`/project/${id}`);
});

//to delete a particular project
router.delete("/project/:id", async (req, res) => {
  const { id } = req.params;
  //if a project is deleting then all the todos in the project also need to deleted - middleware in project model
  await Project.findByIdAndDelete(id);
  res.redirect(`/project`);
});

module.exports = router;
