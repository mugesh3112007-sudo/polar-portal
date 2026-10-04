const mongoose = require('mongoose');

const expeditionSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  reportFile: String, // file path
  photos: [String], // array of file paths
  videos: [String], // array of file paths
  tags: [String],
  sourceName: String,
  sourceUrl: String
}, { timestamps: true });

module.exports = mongoose.model('Expedition', expeditionSchema);