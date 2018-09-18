let mongoose = require('mongoose');
let validator = require('validator');
let Schema = mongoose.Schema;

let userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    //lowercase: true,
    validate: (value) => {
      return validator.isEmail(value)
    }
  },
  password: {
    type: String,
    required: true,
  },
  firstName: String,
  lastName: String,
  gender: String,
  phone: Number,
})
userSchema.virtual('fullName').get(function() {
  return this.firstName + ' ' + this.lastName
})

module.exports = mongoose.model('User', userSchema, 'User');