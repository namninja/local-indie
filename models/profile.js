const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  imgURL: {
    type: String,
    trim: true
  },
  profileName: {
    type: String,
    trim: true,
    required: true
  },
  genre: {
    type: String,
    trim: true,
    required: false
  },
  website: {
    type: String,
    trim: true,
    required: false
  },
  city: {
    type: String,
    trim: true,
    required: true
  },
  state: {
    type: String,
    trim: true,
    required: true
  },
  about: {
    type: String,
    required: false
  },
  soundCloud: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

ProfileSchema.pre("find", function(next) {
  this.populate("user");
  next();
});

ProfileSchema.pre("findOne", function(next) {
  this.populate("user");
  next();
});

module.exports = Profile = mongoose.model("profiles", ProfileSchema);
