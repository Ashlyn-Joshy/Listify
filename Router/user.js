const express = require("express");
const router = express.Router();

const User = require("../Model/User");
const { validateUser } = require("../middleware/fundamental");
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
    await user.save();
    req.flash("success", "Welcome to Listify");
    res.redirect(`/project`);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
