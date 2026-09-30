const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  type: { type: String, enum: ['photo', 'video'], required: true },
  url: String,
  caption: String,
  relatedExpeditions: [String], // Expedition IDs
  tags: [String]
}, { timestamps: true });

module.exports = mongoose.model('Media', mediaSchema);