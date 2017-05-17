const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user')

let BarSchema = new Schema({
    bar_id: { type: String, required: true },
    numAttendees: { type: Number, required: true, min: 0 },
    usersAttending: { type: String, ref: 'User' },
    createdAt: { type: Date, expires: 57600, default: Date.now }
})

module.exports = mongoose.model('bar', BarSchema);