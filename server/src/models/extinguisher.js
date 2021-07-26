const mongoose = require('mongoose');

const detailsSchema = new mongoose.Schema({
  type: {
    type: String,
    required: false,
    trim: true,
    default: 'CO2',
  },
  class: {
    type: String,
    required: false,
    trim: true,
    default: 'AB',
  },
  usage: {
    type: String,
    required: false,
    trim: true,
    default: 'Feux d\'origine électrique',
  },
});

const extinguisherSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
    trim: true,
    default: '',
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

module.exports = mongoose.model('Extinguisher', extinguisherSchema);
