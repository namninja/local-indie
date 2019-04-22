const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
// Load User model
const User = require("../models/user");
const Profile = require("../models/profile");

function validateRegister(req, res, next) {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  } else {
    return next();
  }
}
function validateLogin(req, res, next) {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  } else {
    return next();
  }
}

// @route POST /register
// @desc Register user
// @access Public

router.post(
  "/signup",
  validateRegister,
  passport.authenticate("register", { session: false }),
  async (req, res, next) => {
    let { profileName, city, state } = req.body;
    let normalizedCity = req.body.city.toUpperCase();
    let normalizedState = req.body.state.toUpperCase();
    let user = req.user._id;
    // We don't want to store the sensitive information such as the
    // user password in the token so we pick only the email and id
    const body = { _id: req.user._id, username: req.user.email };
    // Sign the JWT token and populate the payload with the user email and id
    const token = jwt.sign({ user: body }, keys.JWT_SECRET);
    const loggedUser = {
      _id: req.user._id,
      email: req.user.email,
      token: token
    };
    Profile.create({
      profileName,
      city,
      state,
      user,
      normalizedCity,
      normalizedState
    })
      .then(
        res.json({
          message: "Signup successful",
          user: loggedUser
        })
      )
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: "something went horribly awry" });
      });
  }
);

// @route POST /login
// @desc Login user and return JWT token
// @access Public
router.post("/login", validateLogin, async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error("An Error occured");
        return next(error);
      }
      req.login(user, { session: false }, async error => {
        if (error) return next(error);
        // We don't want to store the sensitive information such as the
        // user password in the token so we pick only the email and id
        const body = { _id: user._id, username: user.email };
        // Sign the JWT token and populate the payload with the user email and id
        const token = jwt.sign({ user: body }, keys.JWT_SECRET);
        const loggedUser = {
          _id: user._id,
          email: user.email,
          token: token
        };
        // Send back the token to the user
        return res.json({ user: loggedUser });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

const jwtAuth = passport.authenticate("jwt", {
  session: false,
  failWithError: true
});

router.get("/api/validate", jwtAuth, async (req, res, next) => {
  try {
    if (!req.user) {
      const error = new Error("Invalid Token");
      return next(error);
    }
    const loggedUser = {
      _id: req.user._id,
      email: req.user.email
    };
    return res.status(200).json({ user: loggedUser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
