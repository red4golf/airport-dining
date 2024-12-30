const mongoose = require('mongoose');

const searchAnalyticsSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  searchTerm: { type: String, required: true },
  wasFound: { type: Boolean, required: true },
  timezone: String,
  userAgent: String,
  region: String
});

module.exports = mongoose.model('SearchAnalytics', searchAnalyticsSchema);
