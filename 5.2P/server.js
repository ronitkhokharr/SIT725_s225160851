const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

const booksRoute = require('./routes/books.routes');
app.use('/api/books', booksRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});