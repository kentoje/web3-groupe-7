const mongoose = require('mongoose');

const detailsSchema = new mongoose.Schema({
  type: {
    type: String,
    required: false,
    trim: true,
    default: "DAAF",
  },
  class: {
    type: String,
    required: false,
    trim: true,
    default: "Marquage CE"
  },
  usage: {
    type: String,
    required: false,
    trim: true,
    default: "Tous les feux"
  },
})

const smokeDetectorSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
    trim: true,
    default: "topic",
  },
  lastModified: {
    type: Date,
    default: Date.now(),
  },
  id: {
    type: Number,
    required: false,
  },
  details: {
    type: detailsSchema,
    default: () => ({}),
  },
});

module.exports = mongoose.model("SmokeDetector", smokeDetectorSchema)
