import { Link } from 'react-router-dom';

export default function Home({ books, onUpdateBook }) {
  const currentlyReading = books.filter(book => book.shelf === 'currentlyReading');
  const wantToRead = books.filter(book => book.shelf === 'wantToRead');
  const read = books.filter(book => book.shelf === 'read');

  const handleShelfChange = (book, newShelf) => {
    onUpdateBook(book, newShelf);
  };

  const renderBook = (book) => (
    <li key={book.id}>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 150,
              height: 200,
              backgroundImage: book.imageLinks 
                ? `url("${book.imageLinks.thumbnail}")` 
                : '',
            }}
          ></div>
          <div className="book-shelf-changer">
            <select 
              value={book.shelf || 'none'} 
              onChange={(e) => handleShelfChange(book, e.target.value)}
            >
              <option value="none" disabled>
                Move to...
              </option>
              <option value="currentlyReading">
                Currently Reading
              </option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.authors ? book.authors.join(', ') : 'Unknown Author'}
        </div>
      </div>
    </li>
  );

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {currentlyReading.map(renderBook)}
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {wantToRead.map(renderBook)}
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {read.map(renderBook)}
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
}