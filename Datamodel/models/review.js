let mongoose = require('mongoose');
let validator = require('validator');
let Schema = mongoose.Schema;

let reviewSchema = new Schema({
    accommodationId: {
        type: Schema.Types.ObjectId, ref: 'Accommodation'
    },
    review: String,
    reviewer: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    star: Number,
    createdDate: {
        type: Date, default: Date.now
    }
})

module.exports = mongoose.model('Review', reviewSchema, 'Review');