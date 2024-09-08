var express = require('express');
var router = express.Router();

const Book = require('../models/book');
const Author = require('../models/author');
const Booking = require('../models/booking');

/* GET users listing. */
router.get('/add-author', function (req, res, next) {
  res.render('add-author')
});

router.post('/add-author', async function (req, res) {
  const { firstName, familyName, dateBirth, dateDeath } = req.body
  const createdAuthor = await Author.create({
    firstName,
    familyName,
    dateBirth,
    dateDeath
  })
  res.json(createdAuthor);

})

router.get('/add-book', async (req, res) => {
  // Recuperar todos los autores de la coleccion Authors
  const authors = await Author.find()
  res.render('add-book', {
    authors
  })
})

router.post('/add-book', async (req, res) => {

  const { title, summary, isbn, author } = req.body;

  const book = new Book({
    title,
    summary,
    isbn,
    author
  })

  const resultado = await book.save();
  res.send(resultado);

})

router.get('/books', async (req, res) => {
  const books = await Book.find().populate('author'); // Iteración 4
  console.log("🚀 ~ file: library.js:59 ~ router.get ~ books:", books)

  console.log("Libros a enviar a la vista: ", books);

  res.render('books', {
    books
  })
})

router.get('/book/:idBook/booking', async (req,res) => {
  const { idBook } = req.params;
  const book = await Book.findById(idBook);
  res. render('add-booking', {
    book
  })
})

router.post('/booking/new-booking', async (req, res) => {
  const { startDate, endDate, idBook } = req.body
  const book = await Book.findById(idBook)
  const start = new Date(startDate);
  const end = new Date(endDate);
  const isBooked = await Booking.findOne({
    book: idBook,
    // Las fechas se solapan si la fecha de inicio de la reserva existente es menor que la fecha de fin de la nueva
    // y la fecha de fin de la reserva existente es mayor que la fecha de inicio de la nueva
    $or: [
        { startDate: { $lt: end }, endDate: { $gt: start } }
    ]
});

  if (isBooked) {
    return res.status(400).send('Este libro ya está reservado en el rango de fechas seleccionado.');
  }

  const newBooking = await Booking.create({
    startDate,
    endDate,
    book
  })

  book.bookings.push(newBooking);
  await book.save();
  res.json(newBooking);
})

router.get('/bookings-list', async (req, res) => {
  const bookings = await Booking.find().populate('book');
  res.render('bookings-list', {
    bookings
  })
})


module.exports = router;
