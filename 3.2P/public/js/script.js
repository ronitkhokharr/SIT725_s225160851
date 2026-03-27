document.addEventListener('DOMContentLoaded', () => {
  fetch('/api/books')
    .then(response => response.json())
    .then(result => {
      const books = result.data;
      const bookList = document.getElementById('book-list');

      books.forEach(book => {
        const card = `
          <div class="col s12 m6 l3">
            <div class="card medium hoverable">
              <div class="card-image">
                <img src="${book.image}" alt="${book.title}">
                <span class="card-title">${book.title}</span>
              </div>
              <div class="card-content">
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>Category:</strong> ${book.category}</p>
                <p>${book.description}</p>
              </div>
            </div>
          </div>
        `;
        bookList.innerHTML += card;
      });
    })
    .catch(error => {
      console.error('Error fetching books:', error);
    });
});