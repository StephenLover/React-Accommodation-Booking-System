let mongoose = require('mongoose');
let validator = require('validator');
let Schema = mongoose.Schema;

let accommodationSchema = new Schema({
    _id: Number,
    owner: {
        type: String, ref: 'User'
    },
    address: String,
    suburb: String,
    postcode: Number,
    capacity: Number,
    startDate: Date,
    endDate: Date,
    price: Number,
    status: String,
    pictures: [String],
    longitude: Number,
    latitude: Number,
})


module.exports = mongoose.model('Accommodation', accommodationSchema, 'Accommodation');