import './App.css';
import Home from './Home';
import Search from './Search';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as BooksAPI from './BooksAPI';

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    BooksAPI.getAll().then((books) => setBooks(books));
  }, []);

  const updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      setBooks(books => 
        books.map(b => b.id === book.id ? {...book, shelf} : b)
      );
    });
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={
            <Home 
              books={books} 
              onUpdateBook={updateBook}
            />
          } />
          <Route path="/search" element={
            <Search 
              books={books}
              onUpdateBook={updateBook}
            />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
