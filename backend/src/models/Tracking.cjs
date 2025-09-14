const mongoose = require('mongoose');

const TrackingSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  trackingId: {
    type: String,
    required: true,
    trim: true
  },
  carrier: {
    type: String,
    trim: true,
    default: ''
  },
  userIP: {
    type: String,
    default: ''
  },
  userAgent: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Tracking', TrackingSchema);
