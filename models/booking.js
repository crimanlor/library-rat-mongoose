const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    startDate: { type: Date },
    endDate: { type: Date },
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Books'}
})

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;