import React, { Component } from 'react';
import Axios from 'axios';
import img from "../components/BD.jpg"
import '../Styles/home.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();



class BookDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookDetails: {},
    };
  }

  componentDidMount() {
    // Fetch book details when the component mounts
    this.fetchBookDetails();
  }

  componentDidUpdate(prevProps) {
    // Fetch book details when the _id prop changes
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.fetchBookDetails();
    }
  }

  fetchBookDetails() {
    const { id } = this.props.match.params; // Access the id parameter

    Axios.get(`http://localhost:2023/bookDetails/${id}`, {
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        this.setState({ bookDetails: response.data.Book });
      })
      .catch((error) => {
        console.error('Error fetching book details:', error);
      });
  }

  render() {
    const { bookDetails } = this.state;

    // Render book details
    return (
        <div className="book-details-container">
        <h2 style={{"margin-top": "35px"}}>Book Details</h2>
        <div className="book-details-content row">

          <div className='col-6 col-sm-6' data-aos="fade-right">
            <img src={img} className="D_img" alt="book" style={{"margin-top":"30px"}}/>
          </div>
          
          <div className='col-5 col-sm-5'>
          <div className="" style={{"text-align": "left","margin-left": "25px","margin-top": "35px"}} data-aos="fade-left">
            <h3 ><b>Title:</b> {bookDetails.book_title}</h3>
            <p><b>Author:</b> {bookDetails.author}</p>
            <p><b>Publisher:</b> {bookDetails.publisher}</p>
            <p><b>Published_date:</b> {bookDetails.published_date}</p>
            <p><b>Overview:</b> {bookDetails.overview}</p>

          </div>
          </div>
          <div className='col-1 col-sm-1'></div>


          
        </div>
      </div>
    );
  }
}

export default BookDetails;
