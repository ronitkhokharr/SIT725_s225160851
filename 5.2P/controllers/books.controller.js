const bookService = require('../services/books.service');

const getAllBooks = async (_req, res, next) => {
  try {
    const books = await bookService.getAllBooks();
    res.status(200).json({
      statusCode: 200,
      data: books,
      message: 'Books retrieved using service'
    });
  } catch (err) {
    next(err);
  }
};

const getBookById = async (req, res, next) => {
  try {
    const book = await bookService.getBookById(req.params.id);

    if (!book) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Book not found'
      });
    }

    res.status(200).json({
      statusCode: 200,
      data: book
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllBooks,
  getBookById
};