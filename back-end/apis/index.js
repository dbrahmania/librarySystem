const fs = require("fs");
const path = require("path");

const dbURL = path.resolve(__dirname, "../db/books.json");
function getAllBooks(req, res) {
  fs.readFile(dbURL, (err, data) => {
    if (err) {
      res.status(500).send({
        status: "ERROR",
        message: err.message,
        data: []
      });
    } else {
      res.status(200).send({
        status: "SUCCESS",
        message: "",
        data: JSON.parse(data)
      });
    }
  });
}

function getBook(req, res) {
  fs.readFile(dbURL, (err, data) => {
    if (err) {
      res.status(500).send({
        status: "ERROR",
        message: "FAILED TO READ BOOKS DB",
        data: []
      });
    } else {
      // res.status(200).send(JSON.parse(data));
      let bookId = req.params.bookid;
      let booksDB = JSON.parse(data);
      let bookIndex = booksDB.books.map(book => book.isbn).indexOf(bookId);
      res.status(200).send({
        status: "SUCCESS",
        message: "",
        data: bookIndex === -1 ? [] : booksDB.books[bookIndex]
      });
    }
  });
}
function updateBook(req, res) {
  fs.readFile(dbURL, (err, data) => {
    if (err) {
      res.status(500).send({
        status: "ERROR",
        message: err.message,
        data: []
      });
    } else {
      let updatedBookInfo = req.body;
      let booksDB = JSON.parse(data);

      let bookIndex = booksDB.books
        .map(book => book.isbn)
        .indexOf(updatedBookInfo.isbn);
      // console.log("Here is the data, ", bookId, updatedBookInfo, bookIndex);
      if (bookIndex === -1) {
        res.status(204).send({
          status: "ERROR",
          message: "No Book Found",
          data: []
        });
      } else {
        booksDB.books[bookIndex] = updatedBookInfo;
        fs.writeFile(dbURL, JSON.stringify(booksDB), err => {
          if (err) {
            res.status(500).send({
              status: "ERROR",
              message: "Error Occurred in Saving file",
              data: []
            });
          }
          res.status(200).send({
            status: "SUCCESS",
            message: "Successfully Updated book Information",
            data: []
          });
        });
      }
    }
  });
}

function addBook(req, res) {
  fs.readFile(dbURL, (err, data) => {
    if (err) {
      res.status(500).send({
        status: "ERROR",
        message: err.message,
        data: []
      });
    } else {
      let updatedBookInfo = req.body;
      let booksDB = JSON.parse(data);
      booksDB.books.push(updatedBookInfo);
      booksDB.count = booksDB.count + 1;
      fs.writeFile(dbURL, JSON.stringify(booksDB), err => {
        if (err) {
          res.status(500).send({
            status: "ERROR",
            message: "Error Occurred in Saving file",
            data: []
          });
        }
        res.status(200).send({
          status: "SUCCESS",
          message: "Successfully added book Information",
          data: []
        });
      });
    }
  });
}

function removeBook(req, res) {
  fs.readFile(dbURL, (err, data) => {
    if (err) {
      res.status(500).send({
        status: "ERROR",
        message: err.message,
        data: []
      });
    } else {
      // res.status(200).send(JSON.parse(data));
      let bookId = req.params.bookid;
      let booksDB = JSON.parse(data);
      let bookIndex = booksDB.books.map(book => book.isbn).indexOf(bookId);
      if (bookIndex === -1) {
        res.status(204).send({
          status: "ERROR",
          message: "No Book Found",
          data: []
        });
      } else {
        booksDB.books.splice(bookIndex, 1);
        booksDB.count = booksDB.count - 1;
        fs.writeFile(dbURL, JSON.stringify(booksDB), err => {
          if (err) {
            res.status(500).send({
              status: "ERROR",
              message: "Error Occurred in Saving file",
              data: []
            });
          }
          res.status(200).send({
            status: "SUCCESS",
            message: "Successfully removed book Information",
            data: []
          });
        });
      }
    }
  });
}
const API = {
  getBook: getBook,
  getAllBooks: getAllBooks,
  updateBook: updateBook,
  addBook: addBook,
  removeBook: removeBook
};

module.exports = API;
