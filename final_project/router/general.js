const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(200).json({books});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  
  const isbn = req.params.isbn;
  const booksKeyArr = Object.keys(books);

  if(booksKeyArr.includes(isbn))
    return res.status(200).json({data : books[isbn]});
  else
    return res.status(404).json({message: "Data not found"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here

  const author = req.params.author;
  const booksKeyArr = Object.keys(books);

  for(const isbn of booksKeyArr)
    if(books[isbn].author === author)
        return res.status(200).json({data : books[isbn]});

  return res.status(404).json({message: "Data not found"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here

  const title = req.params.title;
  const booksKeyArr = Object.keys(books);

  for(const isbn of booksKeyArr)
    if(books[isbn].title === title)
        return res.status(200).json({data : books[isbn]});

  return res.status(404).json({message: "Data not found"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
