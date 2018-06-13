var mongoose = require('mongoose');

var logData = mongoose.model('logData', {
  area: {
    type: String,
    required: true,
    trim: true
  },
  lat: {
    type: String,
    required: true,
    trim: true  },
  long: {
    type: String,
    required: true,
    trim: true  },
  contestID: {
    type: String,
    required: true,
    trim: true  },
  completedAt: {
    type: Number,
    default: null
  }
});

module.exports = {logData};
