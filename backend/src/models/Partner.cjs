const mongoose = require('mongoose');

const PartnerSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  contactName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true,
    default: ''
  },
  companyName: {
    type: String,
    required: true,
    trim: true
  },
  industries: [{
    type: String,
    trim: true
  }],
  estimatedUnits: {
    type: String,
    default: ''
  },
  comments: {
    type: String,
    default: ''
  },
  file: {
    originalName: String,
    mimeType: String,
    size: Number,
    buffer: Buffer
  },
  status: {
    type: String,
    enum: ['new', 'reviewing', 'approved', 'rejected', 'contacted'],
    default: 'new'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

PartnerSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Partner', PartnerSchema);
