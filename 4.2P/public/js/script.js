document.addEventListener('DOMContentLoaded', () => {
  fetchBooks();

  const form = document.getElementById('bookForm');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const book = {
      title: document.getElementById('title').value,
      author: document.getElementById('author').value,
      category: document.getElementById('category').value,
      year: parseInt(document.getElementById('year').value),
      image: document.getElementById('image').value,
      summary: document.getElementById('summary').value
    };

    try {
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
      });

      const result = await response.json();
      alert(result.message);

      form.reset();
      fetchBooks();
    } catch (error) {
      console.error('Error adding book:', error);
    }
  });
});

async function fetchBooks() {
  try {
    const response = await fetch('/api/books');
    const result = await response.json();

    const bookList = document.getElementById('book-list');
    bookList.innerHTML = '';

    if (result.statusCode === 200) {
      result.data.forEach(book => {
        const card = `
          <div class="book-card">
            <img src="${book.image}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Category:</strong> ${book.category}</p>
            <p><strong>Year:</strong> ${book.year}</p>
            <p>${book.summary}</p>
          </div>
        `;
        bookList.innerHTML += card;
      });
    }
  } catch (error) {
    console.error('Error fetching books:', error);
  }
}