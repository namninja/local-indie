require("dotenv").config();
const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const router = express.Router();
const Profile = require("../models/profile");
const Event = require("../models/event");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET
});

router.post(
  "/post-event/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    req.body.userProfile = req.params.id;
    Event.create(req.body)
      .then(
        res.status(201).json({
          message: "Event posted successfully",
          event: req.body
        })
      )
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: "something went horribly awry" });
      });
  }
);

router.delete(
  "/post-event/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    Event.findByIdAndRemove(req.params.id)
      .then(res.status(204).end())
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: "something went horribly awry" });
      });
  }
);

// might reconfigure this one
router.get("/events", (req, res, next) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1.5);
  Event.find({ eventDate: { $gt: yesterday } }, null, { sort: { date: 1 } })
    .then(events => {
      res.status(201).json(events);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

router.get("/events/:id", (req, res, next) => {
  Event.findOne({ _id: req.params.id })
    .then(event => {
      res.status(200).json(event);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

router.get("/artist/events/:id", (req, res, next) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  Event.find(
    { userProfile: req.params.id, eventDate: { $gt: yesterday } },
    null,
    { sort: { date: 1 } }
  )
    .then(events => {
      res.status(201).json(events.map(event => event.serialize()));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

router.get("/find-events", (req, res, next) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1.5);
  Event.find(
    {
      normalizedState: req.body.eventState,
      normalizedCity: req.body.eventCity,
      eventDate: { $gt: yesterday }
    },
    null,
    { sort: { date: 1 } }
  )
    .then(events => {
      res.status(201).json(events);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});
router.post(
  "/image-upload/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const path = req.files[0].path;
    cloudinary.uploader.upload(path).then(image => res.json([image]));
  }
);
module.exports = router;
module.exports = router;
