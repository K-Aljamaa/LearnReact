// src/components/Bookshelf.js

import React from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import PropTypes from "prop-types";

const Bookshelf = ({ books, onUpdateShelf }) => {
  const shelves = [
    { title: "Currently Reading", key: "currentlyReading" },
    { title: "Want to Read", key: "wantToRead" },
    { title: "Read", key: "read" },
  ];

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>My Bookshelf</h1>
      </div>
      <div className="list-books-content">
        {shelves.map((shelf) => (
          <div className="bookshelf" key={shelf.key}>
            <h2 className="bookshelf-title">{shelf.title}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {books
                  .filter((book) => book.shelf === shelf.key)
                  .map((book) => (
                    <li key={book.id}>
                      <Book book={book} onUpdateShelf={onUpdateShelf} />
                    </li>
                  ))}
              </ol>
            </div>
          </div>
        ))}
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

Bookshelf.propTypes = {
  books: PropTypes.array.isRequired,
  onUpdateShelf: PropTypes.func.isRequired,
};

export default Bookshelf;
