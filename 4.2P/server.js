const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect('mongodb://127.0.0.1:27017/bookLibraryDB');

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.log('MongoDB connection error:', err);
});

const BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  category: String,
  year: Number,
  summary: String,
  image: String
});

const Book = mongoose.model('Book', BookSchema);

app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find({});
    res.json({
      statusCode: 200,
      data: books,
      message: 'Success'
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: 'Failed to fetch books'
    });
  }
});

app.post('/api/books', async (req, res) => {
  try {
    const { title, author, category, year, summary, image } = req.body;

    const newBook = new Book({
      title,
      author,
      category,
      year,
      summary,
      image
    });

    await newBook.save();

    res.status(201).json({
      statusCode: 201,
      message: 'Book added successfully',
      data: newBook
    });
  } catch (error) {
    res.status(400).json({
      statusCode: 400,
      message: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});