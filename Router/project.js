const express = require("express");
const router = express.Router();

const Project = require("../Model/Project");
const ExpressError = require("../ErrorHandling/expressError");
const { validateProject, auth } = require("../middleware/fundamental");

//to display all projects
router.get("/project", auth, async (req, res) => {
  const project = await Project.find({});
  res.render("Project", { project });
});

//to add a new project
router.get("/project/new", auth, (req, res) => {
  res.render("Project/new");
});
router.post("/project", validateProject, async (req, res) => {
  const project = await new Project(req.body.Project);
  project.createdDate = new Date();
  await project.save();
  req.flash("success", "New project is created");
  res.redirect(`/project/${project.id}`);
});

//to show only one particular project
router.get("/project/:id", auth, async (req, res, next) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id).populate("todos");
    res.render("Project/show", { project });
  } catch (error) {
    next(new ExpressError("Project not found", 404));
  }
});

//to edit a particular project
router.get("/project/:id/edit", auth, async (req, res, next) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id);
    res.render("Project/edit", { project });
  } catch (error) {
    next(new ExpressError("Project not found", 404));
  }
});
router.put("/project/:id", validateProject, async (req, res) => {
  const { id } = req.params;
  const project = await Project.findByIdAndUpdate(id, req.body.Project);
  await project.save();
  req.flash("success", "Project data is updated");
  res.redirect(`/project/${id}`);
});

//to delete a particular project
router.delete("/project/:id", auth, async (req, res) => {
  const { id } = req.params;
  //if a project is deleting then all the todos in the project also need to deleted - middleware in project model
  await Project.findByIdAndDelete(id);
  req.flash("error", "Project is deleted");
  res.redirect(`/project`);
});

module.exports = router;
