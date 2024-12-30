const Restaurant = require('../models/restaurant');
const Review = require('../models/review');

// Get all restaurants
exports.getRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.status(200).json(restaurants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get restaurant by ID
exports.getRestaurantById = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
        res.status(200).json(restaurant);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new review
exports.createReview = async (req, res) => {
    const review = new Review({
        restaurantId: req.body.restaurantId,
        rating: req.body.rating,
        comment: req.body.comment,
    });

    try {
        const savedReview = await review.save();
        res.status(201).json(savedReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get reviews for a restaurant
exports.getReviewsForRestaurant = async (req, res) => {
    try {
        const reviews = await Review.find({ restaurantId: req.params.id });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};