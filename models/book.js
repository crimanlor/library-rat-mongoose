const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    title: String,
    summary: String,
    isbn: String,
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'Authors'},
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bookings' },] 
})

const Book = new mongoose.model('Books', bookSchema);
module.exports = Book;