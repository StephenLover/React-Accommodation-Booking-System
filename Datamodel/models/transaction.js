let mongoose = require('mongoose');
let validator = require('validator');
let Schema = mongoose.Schema;

let transactionSchema = new Schema({
    accommodationId: {
        type: Schema.Types.ObjectId, ref: 'Accommodation'
    },
    traveler: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    status: String,
    createdTime: {type: Date, default: Date.now},
    endTime: {type: Date, default: () => Date.now() + 7*24*60*60*1000},
    modifiedTime: Date,
})

module.exports = mongoose.model('Transaction', transactionSchema, 'Transaction');