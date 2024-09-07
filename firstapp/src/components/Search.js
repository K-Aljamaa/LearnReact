// src/components/Search.js

import React, { useState } from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import * as BooksAPI from "../api/BooksAPI";
import PropTypes from "prop-types";

const Search = ({ books, onUpdateShelf }) => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setSearchResults([]);
      return;
    }

    BooksAPI.search(value).then((results) => {
      if (results.error) {
        setSearchResults([]);
      } else {
        // Map over results to set shelf if the book is already in the user's collection
        setSearchResults(
          results.map((book) => {
            const existingBook = books.find((b) => b.id === book.id);
            return existingBook ? existingBook : { ...book, shelf: "none" };
          })
        );
      }
    });
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            value={query}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {searchResults.map((book) => (
            <li key={book.id}>
              <Book book={book} onUpdateShelf={onUpdateShelf} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

Search.propTypes = {
  books: PropTypes.array.isRequired,
  onUpdateShelf: PropTypes.func.isRequired,
};

export default Search;
