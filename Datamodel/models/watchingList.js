let mongoose = require('mongoose');
let validator = require('validator');
let Schema = mongoose.Schema;

let watchingListSchema = new Schema({
    user: {
        type: String, ref: 'User'
    },
    watching_list: [{
        type: Number, ref: 'Accommodation'
    }],
})

module.exports = mongoose.model('WatchingList', watchingListSchema, 'WatchingList');