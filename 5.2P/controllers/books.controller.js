const bookService = require('../services/books.service');

const getAllBooks = (req, res) => {
  const books = bookService.getAllBooks();
  res.json({
    statusCode: 200,
    data: books
  });
};

const getBookById = (req, res) => {
  const book = bookService.getBookById(req.params.id);

  if (!book) {
    return res.status(404).json({
      statusCode: 404,
      message: 'Book not found'
    });
  }

  res.json({
    statusCode: 200,
    data: book
  });
};

module.exports = { getAllBooks, getBookById };