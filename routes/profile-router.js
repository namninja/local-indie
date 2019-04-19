const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const router = express.Router();
const Profile = require("../models/profile");
const User = require("../models/user");
//Displays information tailored according to the logged in user

router.get("/artists", (req, res, next) => {
  console.log(req);
  Profile.find({ state: req.state, city: req.city })
    .then(artists => {
      res.json(artists);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

router.get("/profile/:id", (req, res, next) => {
  console.log(req);
  res.json({
    message: "You made it to the secure route",
    user: req.user,
    token: req.query.secret_token
  });
});
router.post(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    //We'll just send back the user details and the token
    console.log(req);
    res.json({
      message: "You made it to the secure route",
      user: req.user,
      token: req.query.secret_token
    });
  }
);

module.exports = router;
