// src/components/Book.js

import React from "react";
import PropTypes from "prop-types";

const Book = ({ book, onUpdateShelf }) => {
  const handleChange = (event) => {
    const newShelf = event.target.value;
    onUpdateShelf(book, newShelf);
  };

  const thumbnail =
    book.imageLinks && book.imageLinks.thumbnail
      ? book.imageLinks.thumbnail
      : "https://via.placeholder.com/128x193?text=No%20Cover";

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url("${thumbnail}")`,
          }}
        ></div>
        <div className="book-shelf-changer">
          <select value={book.shelf || "none"} onChange={handleChange}>
            <option value="move" disabled>
              Move to...
            </option>
            <option value="currentlyReading">
              Currently Reading
            </option>
            <option value="wantToRead">
              Want to Read
            </option>
            <option value="read">
              Read
            </option>
            <option value="none">
              None
            </option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      {book.authors && (
        <div className="book-authors">{book.authors.join(", ")}</div>
      )}
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onUpdateShelf: PropTypes.func.isRequired,
};

export default Book;
