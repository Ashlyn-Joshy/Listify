const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const User = require("../Model/User");
const { validateUser } = require("../middleware/fundamental");

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.privateKey, {
    expiresIn: maxAge,
  });
};

//user register
router.get("/register", (req, res) => {
  res.render("User/register");
});
router.post("/register", validateUser, async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  try {
    if (password !== confirmPassword) {
      req.flash("error", "password and confirm password should be equal");
      return res.redirect(`/register`);
    }
    //find the user have the same email id
    const findUser = await User.findOne({ email });
    if (findUser) {
      req.flash("error", "User with this email already exists");
      return res.redirect("/register");
    }
    //saving the user data to the db
    const user = await User.create({ name, email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    req.flash("success", "Welcome to Listify");
    res.redirect(`/project`);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

//user login
router.get("/login", (req, res) => {
  res.render("User/login");
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    //login - static function
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    req.flash("success", "Welcome Back");
    res.redirect("/project");
  } catch (error) {
    req.flash("error", error.message);
    return res.redirect("/login");
  }
});

//user logout
router.get("/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  req.flash("success", "Bye");
  res.redirect("/");
});

module.exports = router;
