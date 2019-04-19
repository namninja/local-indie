const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const EventSchema = new Schema({
  userProfile: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
  eventImg: {
    type: String,
    trim: true
  },
  eventName: {
    type: String,
    trim: true,
    required: true
  },
  eventDate: {
    type: Date,
    trim: true,
    required: true
  },
  eventAddress: {
    type: String,
    trim: true,
    required: true
  },
  eventAddress2: {
    type: String,
    trim: true,
    required: false
  },
  eventCity: {
    type: String,
    trim: true,
    required: true
  },
  eventState: {
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
  eventCost: {
    type: String,
    required: false
  },
  eventStart: {
    type: String,
    required: false
  },
  eventEnd: {
    type: String,
    required: false
  },
  eventDetails: {
    type: String,
    required: false
  }
});

EventSchema.pre("find", function(next) {
  this.populate("user");
  next();
});

EventSchema.pre("findOne", function(next) {
  this.populate("user");
  next();
});

module.exports = mongoose.model("Event", EventSchema);
