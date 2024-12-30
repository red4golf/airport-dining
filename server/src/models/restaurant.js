module.exports = {
    name: String,
    location: {
        type: {
            type: String,
            enum: ['Point'], // 'Point' for GeoJSON
            required: true
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true
        }
    },
    airport: {
        type: String,
        required: true
    },
    cuisine: {
        type: [String], // Array of cuisine types
        required: true
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }]
};