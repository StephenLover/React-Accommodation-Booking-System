let mongoose = require('mongoose');
let validator = require('validator');
let Schema = mongoose.Schema;

let pendingListSchema = new Schema({
    user: {
        type: String, ref: 'User'
    },
    accommodationId: {
        type: Number, ref: 'Accommodation'
    },
})

module.exports = mongoose.model('PendingList', pendingListSchema, 'PendingList');