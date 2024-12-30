module.exports = {
    name: String,
    location: {
        latitude: Number,
        longitude: Number
    },
    restaurants: [{
        type: String,
        name: String,
        cuisine: String,
        reviews: [{
            type: String,
            ref: 'Review'
        }]
    }]
};