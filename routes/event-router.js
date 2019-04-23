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
router.post("/events", (req, res, next) => {
  console.log(req.body);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1.5);
  Event.find(
    {
      normalizedState: req.body.state.toUpperCase(),
      normalizedCity: req.body.city.toUpperCase(),
      eventDate: { $gt: yesterday }
    },
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

router.get("/events/states", (req, res, next) => {
  Event.distinct("normalizedState")
    .then(states => {
      res.status(200).json(states);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});
router.get("/events/states/:id", (req, res, next) => {
  Event.find({ normalizedState: req.params.id })
    .distinct("normalizedCity")
    .then(cities => {
      res.status(200).json(cities);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});
router.get("/event/:id", (req, res, next) => {
  Event.findById(req.params.id)
    .then(event => {
      res.status(201).json(event.serialize());
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
