const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  category: String,
  attachments: [String]
}, { timestamps: true });

module.exports = mongoose.model('InstitutionalActivity', activitySchema);