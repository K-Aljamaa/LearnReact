// src/App.js

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import * as BooksAPI from "./api/BooksAPI";
import Bookshelf from "./components/Bookshelf";
import Search from "./components/Search";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    BooksAPI.getAll().then((data) => setBooks(data));
  }, []);

  const updateBookShelf = (updatedBook, newShelf) => {
    BooksAPI.update(updatedBook, newShelf).then(() => {
      // Update local state
      setBooks((prevBooks) => {
        // If the book is already in the state, update its shelf
        const bookExists = prevBooks.find((book) => book.id === updatedBook.id);
        if (bookExists) {
          return prevBooks.map((book) =>
            book.id === updatedBook.id ? { ...book, shelf: newShelf } : book
          );
        } else {
          // If it's a new book, add it to the state
          return [...prevBooks, { ...updatedBook, shelf: newShelf }];
        }
      });
    });
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Bookshelf books={books} onUpdateShelf={updateBookShelf} />
            }
          />
          <Route
            path="/search"
            element={
              <Search books={books} onUpdateShelf={updateBookShelf} />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
