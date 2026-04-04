const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/bookLibraryDB');

const BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  category: String,
  year: Number,
  summary: String,
  image: String
});

const Book = mongoose.model('Book', BookSchema);

const sampleBooks = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self-help",
    year: 2018,
    summary: "A practical guide to building good habits and breaking bad ones.",
    image: "https://images-na.ssl-images-amazon.com/images/I/91bYsX41DVL.jpg"
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "Fiction",
    year: 1988,
    summary: "A novel about dreams, destiny and personal growth.",
    image: "https://images-na.ssl-images-amazon.com/images/I/71aFt4+OTOL.jpg"
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    category: "Productivity",
    year: 2016,
    summary: "A book about focused success in a distracted world.",
    image: "https://images-na.ssl-images-amazon.com/images/I/81JJ7fyyKyS.jpg"
  }
];

async function seedData() {
  try {
    await Book.deleteMany({});
    await Book.insertMany(sampleBooks);
    console.log('Sample books inserted successfully');
    mongoose.connection.close();
  } catch (error) {
    console.log(error);
  }
}

seedData();