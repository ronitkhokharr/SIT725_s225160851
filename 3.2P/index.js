const express = require('express');
const app = express();
const PORT = 3000;

// Books data for API
const books = [
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "Fiction",
    image: "/images/alchemist.jpg",
    description: "A motivational novel about dreams, destiny, and personal growth."
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self-Improvement",
    image: "/images/atomic-habits.jpg",
    description: "A practical guide to building better habits and improving daily routines."
  },
  {
    title: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    category: "Finance",
    image: "/images/rich-dad.jpg",
    description: "A famous book about financial literacy, wealth building, and mindset."
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    category: "Productivity",
    image: "/images/deep-work.jpg",
    description: "A book about focused success in a world full of distractions."
  }
];

// Middleware
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Home route
app.get('/', (req, res) => {
  res.render('index');
});

// GET REST endpoint
app.get('/api/books', (req, res) => {
  res.json({
    statusCode: 200,
    data: books,
    message: "Books retrieved successfully"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});