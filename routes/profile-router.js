require("dotenv").config();
const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const router = express.Router();
const Profile = require("../models/profile");
const User = require("../models/user");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET
});

//Displays information tailored according to the logged in user

router.post("/artists", (req, res, next) => {
  Profile.find({
    normalizedState: req.body.state.toUpperCase(),
    normalizedCity: req.body.city.toUpperCase()
  })
    .then(artists => {
      res.status(200).json(artists.map(artist => artist.serialize()));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});
router.get("/artists/states", (req, res, next) => {
  Profile.distinct("normalizedState")
    .then(states => {
      res.status(200).json(states);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});
router.get("/artists/states/:id", (req, res, next) => {
  Profile.find({ normalizedState: req.params.id })
    .distinct("normalizedCity")
    .then(cities => {
      res.status(200).json(cities);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});
router.get("/artist/:id", (req, res, next) => {
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
router.post(
  "/image-upload/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const path = req.files[0].path;
    cloudinary.uploader.upload(path).then(image => res.json([image]));
  }
);
module.exports = router;
