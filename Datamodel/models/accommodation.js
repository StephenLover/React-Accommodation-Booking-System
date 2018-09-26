let mongoose = require('mongoose');
let validator = require('validator');
//let autoIncrement = require('mongoose-auto-increment-fix');
let Schema = mongoose.Schema;

// const server = '127.0.0.1:27017'; // REPLACE WITH YOUR DB SERVER
// const database = 'test';      // REPLACE WITH YOUR DB NAME
// const url = `mongodb://${server}/${database}`;

// var connection = mongoose.createConnection(url);
 
// autoIncrement.initialize(connection);

let accommodationSchema = new Schema({
    _id: Number,
    property: {
        type: Number, ref: 'Property'
    },
    startDate: Date,
    endDate: Date,
    price: Number,
    status: {
        type: String, default: 'Open'
    }
})

module.exports = mongoose.model('Accommodation', accommodationSchema, 'Accommodation');