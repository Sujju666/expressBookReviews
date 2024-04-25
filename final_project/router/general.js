const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {

    const { username, password } = req.body;

    if (username === "undefined" || password === "undefined") {
        return res.json({ message: "Please provide valid username or password." });
    }

    if (users.length == 0) {
        users.push({ username: username, password: password });
        return res.status(200).json({ message: "User registered successfully." });
    }

    if (users.length > 0) {
        for (const singleUser of users) {
            if (singleUser.username != username) {
                return res.json(200).json({ message: "User registered successfully." });
            }
            else {
                return res.json({ message: "User already exists." });
            }
        }
    }
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {

    return res.status(200).json({ books });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {

    const isbn = req.params.isbn;
    const booksKeyArr = Object.keys(books);

    if (booksKeyArr.includes(isbn)) {
        return res.status(200).json({ data: books[isbn] });
    }
    return res.status(404).json({ message: "Data not found" });
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {

    const author = req.params.author;
    const booksKeyArr = Object.keys(books);

    for (const isbn of booksKeyArr) {
        if (books[isbn].author === author) {
            return res.status(200).json({ data: books[isbn] });
        }
    }

    return res.status(404).json({ message: "Data not found" });
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {

    const title = req.params.title;
    const booksKeyArr = Object.keys(books);

    for (const isbn of booksKeyArr) {
        if (books[isbn].title === title) {
            return res.status(200).json({ data: books[isbn] });
        }
    }

    return res.status(404).json({ message: "Data not found" });
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {

    const isbn = req.params.isbn;
    const booksKeyArr = Object.keys(books);

    if (booksKeyArr.includes(isbn)) {
        return res.status(200).json({ reviews: books[isbn].reviews });
    }
    return res.status(404).json({ message: "Data not found." });
});

module.exports.general = public_users;