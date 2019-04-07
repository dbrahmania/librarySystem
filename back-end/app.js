const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");

const APIS = require("./apis");

const port = 3001;

const app = express();
app.use(bodyParser.json());
app.use(cors());

// app.get("/", (req, res) => console.log(res.status));

// to get all books in the system
app.get("/books", APIS.getAllBooks);
// get single book from books
app.get("/books/:bookid", APIS.getBook);

// // remove book from library
app.delete("/books/:bookid", APIS.removeBook);

// // add book to library
app.put("/books/addBook", APIS.addBook);

// // update existing book in library
app.post("/books/update", APIS.updateBook);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
