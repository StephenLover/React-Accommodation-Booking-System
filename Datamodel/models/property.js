let mongoose = require('mongoose');
let validator = require('validator');
let Schema = mongoose.Schema;

let propertySchema = new Schema({
    _id: Number,
    owner: {
        type: String, ref: 'User'
    },
    address: String,
    suburb: String,
    postcode: Number,
    capacity: Number,
    pictures: [String],
    longitude: Number,
    latitude: Number,
    avgStar: {
        type: Number, default: 0
    }
})

module.exports = mongoose.model('Property', propertySchema, 'Property');