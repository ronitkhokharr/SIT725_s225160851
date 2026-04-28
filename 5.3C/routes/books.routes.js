const express = require('express');
const router = express.Router();
const Controllers = require('../controllers');

router.get('/integrity-check42', (_req, res) => {
  res.status(204).send();
});

router.get('/', Controllers.booksController.getAllBooks);
router.get('/:id', Controllers.booksController.getBookById);

module.exports = router;