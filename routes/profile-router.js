const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const router = express.Router();
const Profile = require("../models/profile");
const User = require("../models/user");
//Displays information tailored according to the logged in user

router.get("/artists", (req, res, next) => {
  Profile.find({
    upperState: req.body.state.toUpperCase(),
    upperCity: req.body.city.toUpperCase()
  })
    .then(artists => {
      res.status(200).json(artists.map(artist => artist.serialize()));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

router.get("/artists/:id", (req, res, next) => {
  Profile.findOne({ _id: req.params.id })
    .then(artist => {
      res.status(200).json(artist.serialize());
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

router.get(
  "/profile/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    Profile.findOne({ user: req.params.id })
      .then(artist => {
        res.status(200).json(artist.serialize());
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
      });
  }
);

router.post(
  "/edit-profile/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    Profile.findOneAndUpdate({ user: req.params.id }, req.body, { new: true })
      .then(artist => {
        res.status(201).json(artist.serialize());
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
      });
  }
);

module.exports = router;
