const express = require('express');
const route = express.Router();
const BooksController = require('../controllers/Books');


route.get('/Books', BooksController.Books);
route.post('/addBook',BooksController.addBook);
route.get('/bookDetails/:_id',BooksController.bookDetailsById)
route.delete('/deleteBook/:_id',BooksController.delete)
route.put('/update/:_id',BooksController.update)



module.exports = route;