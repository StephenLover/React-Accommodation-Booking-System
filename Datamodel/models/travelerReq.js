let mongoose = require('mongoose');
let validator = require('validator');
let Schema = mongoose.Schema;

let travelerReqSchema = new Schema({
    _id: Number,
    user: {
        type: String, ref: 'User'
    },
    suburb: String,
    postcode: Number,
    capacity: Number,
    startDate: Date,
    endDate: Date,
    minPrice: Number,
    maxPrice: Number,
    comment: String
})

module.exports = mongoose.model('TravelerReq', travelerReqSchema, 'TravelerReq');