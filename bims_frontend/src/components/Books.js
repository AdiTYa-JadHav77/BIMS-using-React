import React from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Styles/home.css';
import Modal from 'react-modal';
import img from "../components/book.jpg"
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();







// Model css
const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width:" 400px",
      height: "550px"
    },
};

class Books extends React.Component {
    constructor() {
        super();
        this.state = {
            Books: [],
            formModalIsOpen:false,
            updateModalIsOpen:false,
            selectedBook: {},
            book_title: '',
            author: '',
            overview: '',
            published_date: '',
            publisher:'',
        }
    }







details=()=>{
        

    const { book_title, author,overview,published_date,publisher,Books } = this.state;
    const detailsObj = {
        Books:Books,
        book_title:book_title,
        author:author,
        overview:overview,
        published_date:published_date,
        publisher:publisher  
    };

    axios({
        method: 'POST',
        url: 'http://localhost:2023/addBook',
        headers: { 'Content-Type': 'application/json' },
        data: detailsObj
    })
        .then(response => {
            if (!book_title || !author || !overview || !published_date || !publisher) {
                toast.info(response.data.message);
             }
           else{ 
                 // Fetch the updated list of books after adding a new book
                 axios({
                    url: 'http://localhost:2023/Books',
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                })
                    .then(response => {
                        this.setState({
                            Books: response.data.Books,
                            book_title: '',
                            author: '',
                            overview: '',
                            published_date: '',
                            publisher: '',
                            formModalIsOpen: false,
                        });
                    })
                    .catch(error => {
                        console.log(error);
                    });
                    toast.success(response.data.message);
            }
            

        })
        .catch(error => {
            console.log(error);
        });
}


// Update a book
// Update a book
handleUpdate = (bookId) => {
    // Set the selected book based on the bookId
    const selectedBook = this.state.Books.find((book) => book._id === bookId);
  
    // Check if selectedBook is defined before proceeding
    if (!selectedBook) {
      console.error('Selected book not found.');
      toast.error('Selected book not found.');
      return;
    }
  
    // Update the state to open the update modal and set the selected book
    this.setState({
      updateModalIsOpen: true,
      selectedBook: selectedBook || {},
      // Initialize the form fields with the selected book's details
      book_title: selectedBook.book_title,
      author: selectedBook.author,
      overview: selectedBook.overview,
      published_date: selectedBook.published_date,
      publisher: selectedBook.publisher,
      // Set a flag to indicate that the "Edit" button was clicked
      editButtonClicked: true,
    });
};

// Function to handle the "Update Book" button click
handleUpdateBook = (bookId) => {
    // Check if the "Edit" button was clicked
    console.log("Updating book with values:", this.state);
        if (this.state.editButtonClicked) {
      // Clear the flag and return without making the PUT request
      this.setState({ editButtonClicked: false });
      return;
    }

    // Prepare the update object with the modified details
    const updateObj = {
      book_title: this.state.book_title,
      author: this.state.author,
      overview: this.state.overview,
      published_date: this.state.published_date,
      publisher: this.state.publisher,
    };
  
    // Send the Axios PUT request to update the book
    axios
      .put(`http://localhost:2023/update/${bookId}`, updateObj, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((response) => {
        // Handle successful update here
        console.log(response.data.message); // Optional: Log success message
        toast.success(response.data.message);
        this.setState({updateModalIsOpen:false})
  
        // Fetch the updated list of books after the update
        axios
          .get('http://localhost:2023/Books')
          .then((response) => {
            // Update the state with the new book list
            this.setState({ Books: response.data.Books });
          })
          .catch((error) => {
            console.error('Error fetching updated book list:', error);
          });
      })
      .catch((error) => {
        // Handle errors, e.g., show an error message
        console.error('Error updating book:', error);
        toast.error('Error updating book.');
      });
};

  
  
  


  

    handleModalState=(state,value)=>{
        this.setState({[state]:value})
    }
//     handelInputChange=(event,state)=>{
//         this.setState({[state]:event.target.value})
// }

handleDelete = (bookId) => {

    axios
      .delete(`http://localhost:2023/deleteBook/${bookId}`)
      .then((response) => {
        // Handle successful deletion, e.g., show a success message
        console.log(response.data.message);
        toast.success(response.data.message);
        sessionStorage.clear();

        
        // Fetch the updated list of books after deletion
        axios
          .get('http://localhost:2023/Books')
          .then((response) => {
            // Update the state with the new book list
            this.setState({ Books: response.data.Books });

          })
          .catch((error) => {
            console.error('Error fetching updated book list:', error);
          });
      })
      .catch((error) => {
        // Handle errors, e.g., show an error message
        console.error('Error deleting book:', error);

      });
  };
  
  

    componentDidMount() {
        
        axios({
            url: 'http://localhost:2023/Books',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => {
                this.setState({ Books: response.data.Books })
                console.log(response.data.Books)
            })
            .catch()

    }
    handelInputChange = (event, state) => {
        this.setState({ [state]: event.target.value });
    };
    render() {
        const {
            Books,
            book_title,
            author,
            formModalIsOpen,
            overview,
            published_date,
            publisher,
            updateModalIsOpen,
            selectedBook,
        } = this.state;
                return (
            <div>

                <div>
                    <section className="container">
                        <div id="daily" className="container text-light" >
                        <button type="button" class="btn btn-primary" style={{"float":"right", "margin": "10px,10px"}} onClick={()=>this.handleModalState('formModalIsOpen',true)}><i className="fa fa-add"></i>Add Book</button>

                            <h3 className="title" style={{"marginTop":"20px"}} >Books Available</h3>
                            <br />
                            <div>
                                <div className='row' >

                                    {Books.map((item, index) => {
                                        return <div key={index} className='col-lg-4 col-md-6 col-sm-12 g-0 box' >

                                            <div class="card" data-aos="zoom-out-up">
                                                <img src={img} class="card-img-top" alt="..." />
                                                <div class="card-body">
                                                    <h5 class="card-title">{item.book_title}</h5>
                                                    <p class="card-text">Author: {item.author} </p>

                                                    <Link to={`/details/${item._id}`} className="btn btn-primary" style={{ "margin-right": "10px" }}>
                                                        Details
                                                    </Link>

                                                    {/* Delete Button with Trash Icon */}
                                                    <button className="btn btn-danger delete-button" style={{ "margin-right": "10px" }} onClick={() => this.handleDelete(item._id)}>
                                                        <i className="fa fa-trash"></i>
                                                    </button>
                                                    {/* Update Button with Pencil Icon */}
                                                    <button className="btn btn-warning edit-button" style={{ "margin-right": "10px" }} onClick={() => this.handleUpdate(item._id)}>
                                                        <i className="fa fa-pencil"></i>
                                                    </button>

                                                </div>
                                            </div>

                                            <div>

                                            </div>

                                        </div>
                                    })}

                                </div>

                            </div>

                        </div>
                    </section>
                    <ToastContainer theme="colored"  />
                </div>
           
                {/* add Model */}
                <Modal
                    isOpen={formModalIsOpen}
                    style={customStyles}
                    overlayClassName="Overlay"
                >
                    <div>
                    <div className="" style={{fontSize:"24px",float: 'left', margin: '5px',verticalAlign:"null"}} onClick={() => this.handleModalState('formModalIsOpen', false)} ></div>
                        
                        <div style={{ float: 'right', margin: '5px' }} onClick={() => this.handleModalState('formModalIsOpen', false)}><img src="../../Assets/x.svg"/></div>
                        <h3 className="restaurant-name rest-Name" style={{"margin-bottom": "30px"}}>Add Book</h3>
                        <div className="form">Author:</div>  <input  class="form-control" type="text" placeholder="author" id="author" onChange={(event)=>this.handelInputChange(event,'author')} />
                        <div className="form">Book Title:</div>  <input  class="form-control" type="text" placeholder="Book Title" id="book_title" onChange={(event)=>this.handelInputChange(event,'book_title')} />
                        <div className="form">published date:</div>  <input  class="form-control" type="text" placeholder="published date" id="published_date" onChange={(event)=>this.handelInputChange(event,'published_date')}/>
                        <div className="form">Overview:</div>   <textarea   className="form-control" id="overview" placeholder="overview"  onChange={(event)=>this.handelInputChange(event,'overview')}/>
                        <div className="form">publisher:</div>  <input  class="form-control" type="text" placeholder="publisher" id="publisher" onChange={(event)=>this.handelInputChange(event,'publisher')}/>
                        
                        <div><button className="btn btn-danger proceed" style={{"margin-top": "30px","width": "350px"}} onClick={this.details}>Add book</button></div>
                    </div>
                </Modal>

                {/* Update model */}
                <Modal
    isOpen={updateModalIsOpen}
    style={customStyles}
    overlayClassName="Overlay"
>
    <div>
        <div
            className=""
            style={{ fontSize: "24px", float: 'left', margin: '5px', verticalAlign: "null" }}
            onClick={() => this.handleModalState('updateModalIsOpen', false)}></div>

        <div style={{ float: 'right', margin: '5px' }} onClick={() => this.handleModalState('updateModalIsOpen', false)}><img src="../../Assets/x.svg" /></div>
        <h3 className="restaurant-name rest-Name" style={{"margin-bottom": "30px"}}>Update Book</h3>
        <div className="form">Author:</div>
        
        <input
            value={this.state.author} 
            className="form-control"
            type="text"
            placeholder="author"
            id="author"
            onChange={(event) => this.handelInputChange(event, 'author')} />
        
        <div className="form">Book Title:</div>
        <input
            value={this.state.book_title}  
            className="form-control"
            type="text"
            placeholder="Book Title"
            id="book_title"
            onChange={(event) => this.handelInputChange(event, 'book_title')}
        />

        <div className="form">Published Date:</div>
        <input
            value={this.state.published_date} 
            className="form-control"
            type="text"
            placeholder="Published Date"
            id="published_date"
            onChange={(event) => this.handelInputChange(event, 'published_date')}
        />

        <div className="form">Overview:</div>
        <textarea
            value={this.state.overview}  
            className="form-control"
            id="overview"
            placeholder="Overview"
            onChange={(event) => this.handelInputChange(event, 'overview')}
        />

        <div className="form">Publisher:</div>
        <input
            value={this.state.publisher}  
            className="form-control"
            type="text"
            placeholder="Publisher"
            id="publisher"
            onChange={(event) => this.handelInputChange(event, 'publisher')}
        />

        <div><button className="btn btn-danger proceed" style={{"margin-top": "30px","width": "350px"}} onClick={() => this.handleUpdateBook(selectedBook._id)}>Update book</button></div>  
    </div>
</Modal>

            </div>
        
            
        )
    }

}
export default Books;