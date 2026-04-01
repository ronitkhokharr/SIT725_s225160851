document.addEventListener('DOMContentLoaded', () => {
  fetch('/api/books')
    .then(response => response.json())
    .then(result => {
      const books = result.data;
      const bookList = document.getElementById('book-list');

      books.forEach((book, index) => {
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
                <p>${book.description.substring(0, 60)}...</p>
              </div>
              <div class="card-action center-align">
                <a href="#modal-${index}" class="btn modal-trigger blue darken-2">View Details</a>
              </div>
            </div>
          </div>

          <div id="modal-${index}" class="modal">
            <div class="modal-content">
              <h4>${book.title}</h4>
              <p><strong>Author:</strong> ${book.author}</p>
              <p><strong>Category:</strong> ${book.category}</p>
              <p><strong>Description:</strong> ${book.description}</p>
            </div>
            <div class="modal-footer">
              <a href="#!" class="modal-close waves-effect waves-green btn-flat">Close</a>
            </div>
          </div>
        `;

        bookList.innerHTML += card;
      });

      const modals = document.querySelectorAll('.modal');
      M.Modal.init(modals);
    })
    .catch(error => {
      console.error('Error fetching books:', error);
    });
});