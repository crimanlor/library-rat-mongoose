var express = require('express');
var router = express.Router();

const Book = require('../models/book');
const Author = require('../models/author');

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

  console.log("Libros a enviar a la vista: ", books);

  res.render('books', {
    books
  })
})


module.exports = router;
