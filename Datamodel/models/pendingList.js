let mongoose = require('mongoose');
let validator = require('validator');
let Schema = mongoose.Schema;

let pendingListSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    accommodationId: {
        type: Schema.Types.ObjectId, ref: 'Accommodation'
    },
})

module.exports = mongoose.model('PendingList', pendingListSchema, 'PendingList');