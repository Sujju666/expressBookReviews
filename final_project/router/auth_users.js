const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => { //returns boolean
    for (const singleUser of users) {
        if (singleUser.username == username) {
            return true;
        }
    }
    return false;
}

const authenticatedUser = (username, password) => { //returns boolean
    for (const singleUser of users) {
        if (singleUser.username == username && singleUser.password == password) {
            return true;
        }
    }
    return false
}

//only registered users can login
regd_users.post("/login", (req, res) => {

    const { username, password } = req.body;

    if (username === "undefined" || password === "undefined") {
        return res.json({ message: "Please provide valid credentials." });
    }

    if (authenticatedUser(username, password)) {
        const token = jwt.sign({ username: username }, "login", { expiresIn: 60 * 60 });
        req.session.authorization = { token, username };
        return res.status(200).json({ message: "User successfully logged in." });
    }
    else {
        return res.json({ message: "Please register yourself first and try to login." });
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const review = req.params.review;

    books[isbn].reviews[req.session.authorization["username"]] = review;
    return res.status(200).json({ message: "The review has been added or updated for " + books[isbn].title + " book by " + req.session.authorization["username"]});
});

// below code for deleting a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    delete books[isbn].reviews[req.session.authorization["username"]];
    return res.status(200).json({message : "The review has been deleted for " + books[isbn].title + " book by " + req.session.authorization["username"]});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;