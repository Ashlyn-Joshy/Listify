const jwt = require("jsonwebtoken");

const User = require("../Model/User");

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

//the middleware to authenticate the user
module.exports.auth = async (req, res, next) => {
  const token = req.cookies.jwt;
  //check jwt token is verified or exists
  if (token) {
    jwt.verify(token, process.env.privateKey, (err, decodedToken) => {
      if (err) {
        res.redirect("/login");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

//to check the user
module.exports.checkUser = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.privateKey, async (err, decodeToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodeToken.id);
        console.log(user);
        res.locals.user = user;
        req.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};
