const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  imgURL: {
    type: String,
    trim: true,
    default:
      "https://res.cloudinary.com/namninja/image/upload/v1555809657/dzpmw1hbngbmv9u5qb0i.png"
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
  normalizedCity: {
    type: String,
    trim: true,
    required: true
  },
  normalizedState: {
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
ProfileSchema.methods.serialize = function() {
  return {
    id: this._id,
    user: this.user._id,
    imgURL: this.imgURL,
    profileName: this.profileName,
    genre: this.genre,
    website: this.website,
    city: this.city,
    state: this.state,
    about: this.about,
    soundCloud: this.soundCloud
  };
};
ProfileSchema.methods.states = function() {
  return {
    state: this.normalizedState
  };
};
module.exports = mongoose.model("Profile", ProfileSchema);
