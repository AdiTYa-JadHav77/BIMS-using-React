const mongoose = require('mongoose');

// Initialising the mongoose Schema
const Schema = mongoose.Schema;

// Registering the City Schema
const BooksSchema = new Schema({

    book_title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    overview: {
        type: String,
        required: true
    },
    published_date: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    
})
    
module.exports = mongoose.model('Books', BooksSchema, 'Books'); // exporting the model