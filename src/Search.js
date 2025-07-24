import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';

export default function Search({ books, onUpdateBook }) {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (query) => {
    setQuery(query);
    if (query.trim()) {
      BooksAPI.search(query.trim()).then((results) => {
        if (results && !results.error) {
          const booksWithShelf = results.map(book => {
            const existingBook = books.find(b => b.id === book.id);
            return existingBook ? { ...book, shelf: existingBook.shelf } : book;
          });
          setSearchResults(booksWithShelf);
        } else {
          setSearchResults([]);
        }
      }).catch(() => {
        setSearchResults([]);
      });
    } else {
      setSearchResults([]);
    }
  };

  const handleShelfChange = (book, newShelf) => {
    onUpdateBook(book, newShelf);
    setSearchResults(results => 
      results.map(b => b.id === book.id ? { ...b, shelf: newShelf } : b)
    );
  };

  const renderBook = (book) => (
    <li key={book.id}>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
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
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {searchResults.map(renderBook)}
        </ol>
      </div>
    </div>
  );
}