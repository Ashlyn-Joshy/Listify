const express = require("express");
const router = express.Router();

const Project = require("../Model/Project");
const Todo = require("../Model/Todo");
const ExpressError = require("../ErrorHandling/expressError");

//adding todo to the project
router.get("/project/:id/todo/new", async (req, res, next) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id);
    res.render("todo/new", { project });
  } catch (error) {
    next(new ExpressError("Project not found", 404));
  }
});
router.post("/project/:id", async (req, res) => {
  const { id } = req.params;
  const todo = await new Todo(req.body);
  const project = await Project.findById(id);
  project.todos.push(todo);
  todo.status = false;
  todo.createdDate = new Date();
  await todo.save();
  await project.save();
  res.redirect(`/project/${id}`);
});
module.exports = router;
