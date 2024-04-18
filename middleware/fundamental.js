const ExpressError = require("../ErrorHandling/expressError");
const { projectValidation, todoValidation, userValidation } = require("../yup");

module.exports.validateProject = async (req, res, next) => {
  try {
    const { errors } = await projectValidation.validate(req.body.Project);
    if (errors) {
      throw new ExpressError(msg, 400);
    } else {
      next();
    }
  } catch (error) {
    req.flash("warning", error.message);
    res.redirect(`/project`);
  }
};

module.exports.validateTodo = async (req, res, next) => {
  try {
    const { errors } = await todoValidation.validate(req.body.Todo);
    if (errors) {
      throw new ExpressError(msg, 400);
    } else {
      next();
    }
  } catch (error) {
    req.flash("warning", error.message);
    res.redirect("/project");
  }
};

module.exports.validateUser = async (req, res, next) => {
  try {
    const { errors } = await userValidation.validate(req.body);
    if (errors) {
      throw new ExpressError("Invalid signup data", 400);
    } else {
      next();
    }
  } catch (error) {
    req.flash("warning", error.message);
    res.redirect("/register");
  }
};
