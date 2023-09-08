const Books = require('../models/Books')


exports.Books = (req, res) => {
    Books.find().then(
        response => {
            res.status(200).json({ message: "Details Fetched Succesfully", Books: response })
        }
    ).catch(
        err => {
            res.status(500).json({ message: "Error", error: err })
        }
    )
};


exports.addBook=(req,res)=>{
    const { book_title, author, overview, published_date, publisher } = req.body;
    const newBook = new Books({
        book_title: book_title,
        author: author,
        overview: overview,
        published_date: published_date,
        publisher:publisher,
    });
    if(!book_title || !author || !overview || !published_date || !publisher ){
        res.status(200).json({ message: "Please enter all details "});
    }
    else{
        newBook.save().then(response => {
            res.status(200).json({ message: "Book Added Successfully " })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
    }
}

exports.bookDetailsById=(req,res)=>{
    const {_id}=req.params;
    Books.findById(_id)
    .then(
        response =>{
            res.status(200).json({msg:"succesfully feched restaurent Details",Book:response});
        }
    )
    .catch(
        err => res.status(500).json({error:err})
    )
}


exports.delete=(req, res) => {
    const bookId = req.params._id;
  
    // Use the `findByIdAndRemove` method to delete the book by its ID
    Books.findByIdAndRemove(bookId, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      if (!result) {
        return res.status(404).json({ message: 'Book not found' });
      }
      return res.status(200).json({ message: 'Book deleted successfully' });
    });
  };



exports.update = (req, res) => {
  const bookId = req.params._id;
  const { book_title, author, overview, published_date, publisher } = req.body;

  // Find the book by ID and update its fields
  Books.findByIdAndUpdate(
    bookId,
    {
      book_title: book_title,
      author: author,
      overview: overview,
      published_date: published_date,
      publisher: publisher,
    },
    { new: true }, // To return the updated book
    (err, updatedBook) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      if (!updatedBook) {
        return res.status(404).json({ message: 'Book not found' });
      }
      return res.status(200).json({ message: 'Book updated successfully', updatedBook });
    }
  );
};


// Example update controller function
// exports.update = (req, res) => {
//     const bookId = req.params._id; // Get the book's ID from the URL parameter
//     const updatedBookData = req.body; // Contains the updated book details
  
//     // Use Mongoose's findByIdAndUpdate method to update the book
//     Books.findByIdAndUpdate(bookId, updatedBookData, { new: true }, (err, updatedBook) => {
//       if (err) {
//         return res.status(500).json({ error: err });
//       }
//       if (!updatedBook) {
//         return res.status(404).json({ message: 'Book not found' });
//       }
  
//       return res.status(200).json({ message: 'Book updated successfully', updatedBook });
//     });
//   };
  



// exports.QuotesbyId = (req, res) => {
//     const _id = req.params.QId;
//     Quotes.find({ "name": _id }).then(
//         response => {
//             res.status(200).json({ message: "Quotes Fetched Succesfully", Quotes: response })
//         }
//     ).catch(
//         err => {
//             res.status(500).json({ message: "Error", error: err })
//         }
//     )

// };
// exports.QuotesbyId = (req, res) => {
//     const { QuoteId } = req.params;
//     Quotes.find({ Quote_id: QuoteId })
//         .then(response => {
//             res.status(200).json({ message: "Quotes Fetched Succesfully", Quotes: response })
//         }).catch(err => {
//             res.status(500).json({ error: err })
//         })
// }