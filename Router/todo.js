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

//show the todo in the project
router.get("/project/:id/todo/:todoId", async (req, res, next) => {
  const { id, todoId } = req.params;
  try {
    const project = await Project.findById(id);
    const todo = await Todo.findById(todoId);
    res.render("todo/show", { project, todo });
  } catch (error) {
    next(new ExpressError("Todo not found", 404));
  }
});

//edit the todo in the project
router.get("/project/:id/todo/:todoId/edit", async (req, res, next) => {
  const { id, todoId } = req.params;
  try {
    const project = await Project.findById(id);
    const todo = await Todo.findById(todoId);
    res.render("todo/edit", { project, todo });
  } catch (error) {
    next(new ExpressError("Todo not found", 404));
  }
});
router.put("/project/:id/todo/:todoId", async (req, res) => {
  const { id, todoId } = req.params;
  const todo = await Todo.findByIdAndUpdate(todoId, req.body);
  const project = await Project.findById(id);
  todo.updatedDate = new Date();
  await todo.save();
  await project.save();
  res.redirect(`/project/${id}/todo/${todoId}`);
});

//delete the todo in the project
router.delete("/project/:id/todo/:todoId", async (req, res) => {
  const { id, todoId } = req.params;
  //if a todo is deleting it should also delete from the project
  const project = await Project.findByIdAndUpdate(id, {
    $pull: { todos: todoId },
  });
  await Todo.findByIdAndDelete(todoId);
  await project.save();
  res.redirect(`/project/${id}`);
});
module.exports = router;
