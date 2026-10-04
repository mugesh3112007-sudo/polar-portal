const mongoose = require('mongoose');

const datasetSchema = new mongoose.Schema({
  title: String,
  description: String,
  datasetFile: String,
  publishedOn: Date,
  metadata: Object,
  tags: [String],
  sourceName: String,
  sourceUrl: String
}, { timestamps: true });

module.exports = mongoose.model('Dataset', datasetSchema);