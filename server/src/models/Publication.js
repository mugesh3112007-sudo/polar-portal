const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema({
  title: String,
  authors: [String],
  abstract: String,
  pdfUrl: String,
  journal: String,
  publishedOn: Date,
  tags: [String]
}, { timestamps: true });

module.exports = mongoose.model('Publication', publicationSchema);