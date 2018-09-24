let mongoose = require('mongoose');
let validator = require('validator');
let Schema = mongoose.Schema;

let reviewSchema = new Schema({
    accommodationId: {
        type: Number, ref: 'Accommodation'
    },
    review: String,
    reviewer: {
        type: String, ref: 'User'
    },
    star: Number,
    createdDate: {
        type: Date, default: Date.now
    }
})

module.exports = mongoose.model('Review', reviewSchema, 'Review');