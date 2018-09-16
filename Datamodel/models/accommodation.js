let mongoose = require('mongoose');
let validator = require('validator');
let Schema = mongoose.Schema;

let accommodationSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId, ref: 'User'
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