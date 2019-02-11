var mongoose = require('mongoose');

var POISchema = new mongoose.Schema({
    location: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    username: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: true
    }
});

var POI = mongoose.model('POI', POISchema);
module.exports = POI;
