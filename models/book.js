const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    title: String,
    summary: String,
    isbn: String,
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'Authors'},
    bookings: { type: mongoose.Schema.Types.ObjectId, ref: 'Bookings'}
})

const bookingSchema = new mongoose.Schema({
    startedDate: { type: Date },
    endDate: { type: Date },
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Books'}
})

const Book = new mongoose.model('Books', bookSchema);
const Booking = new mongoose.model('Bookings', bookingSchema)
module.exports = {Book, Booking}