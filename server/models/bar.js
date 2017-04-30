const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let BarSchema = new Schema({
    bar_id: { type: String, required: true },
    numAttendees: { type: Number, required: true, min: 0 }
})

module.exports = mongoose.model('bar', BarSchema);