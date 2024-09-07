// src/api/BooksAPI.js

const api = "https://your-api-server.com";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const getAll = () =>
  fetch(`${api}/books`, { headers })
    .then((res) => res.json());

export const update = (book, shelf) =>
  fetch(`${api}/books/${book.id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify({ shelf }),
  }).then((res) => res.json());

export const search = (query) =>
  fetch(`${api}/search?query=${query}`, { headers })
    .then((res) => res.json());
