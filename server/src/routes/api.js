const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/index');

// Route to get all restaurants
router.get('/restaurants', restaurantController.getAllRestaurants);

// Route to get a specific restaurant by ID
router.get('/restaurants/:id', restaurantController.getRestaurantById);

// Route to submit a review for a restaurant
router.post('/restaurants/:id/reviews', restaurantController.submitReview);

module.exports = router;