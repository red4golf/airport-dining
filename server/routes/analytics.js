const express = require('express');
const router = express.Router();
const SearchAnalytics = require('../models/SearchAnalytics');

// Log search
router.post('/search', async (req, res) => {
  try {
    const analytics = new SearchAnalytics(req.body);
    await analytics.save();
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get analytics data (protected route)
router.get('/report', async (req, res) => {
  try {
    const report = await SearchAnalytics.aggregate([
      {
        $group: {
          _id: '$searchTerm',
          count: { $sum: 1 },
          successRate: { 
            $avg: { $cond: ['$wasFound', 1, 0] }
          }
        }
      },
      { $sort: { count: -1 } }
    ]);
    
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
