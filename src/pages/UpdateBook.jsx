import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

// Function to get book details by ID
const getBookById = async (bookId) => {
  if (bookId === undefined) return;
  try {
    const response = await axios.get(`http://localhost:8080/api/v1/books/${bookId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch books:', error);
    toast.error("Failed to fetch book details");
  }
};


function UpdateBook() {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [publicationDate, setPublicationDate] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  // Get Book details by id and set to state variables
  useEffect(() => {
    (async () => {
      if (!bookId) {
        toast.error("Book ID is missing in the URL");
        return;
      }
      const data = await getBookById(bookId);
      if (!data) {
        toast.error("No data found for the given Book ID");
        return;
      }
      setTitle(data.title);
      setAuthor(data.author);
      setIsbn(data.isbn);
      setPublicationDate(data.publicationDate);

      console.log(data);
    })();
  }, [bookId]);

  // Submit form function
  const submitForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(title, author, isbn, publicationDate);

    if (title === "" || author === "" || isbn === "") {
      toast.error("Fill all the text fields");
      setIsLoading(false);
      return;
    }

    const bookData = { title, author, isbn, publicationDate };

    // Update book API call
    try {
      const response = await axios.put(`http://localhost:8080/api/v1/books/${bookId}`, bookData);

      if (response.status === 200) {
        toast.success(response?.data?.message || "Book updated successfully");
      } else {
        toast.error(response?.data?.message || "Failed to update book");
      }

    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      console.error("Error updating book:", error);
    } finally {
      setIsLoading(false);
      navigate("/");
    }
  }

  return (
    <div>
      <div className='container d-flex justify-content-center align-items-center vh-100'>
        <div className='card col-6'>
          <div className='card-body'>
            <h1 className='text-center card-title fw-bold'>Update Book</h1>
            <form onSubmit={submitForm} className='row g-3'>

              <div className='col-md-12'>
                <label className='form-label' htmlFor='title'>Title</label>
                <input type="text" id='title' className='form-control' placeholder='Enter Book Title' value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>

              <div className='col-md-12'>
                <label className='form-label mt-2' htmlFor='author'>Author</label>
                <input type="text" id='author' className='form-control' placeholder='Enter Author Name' value={author} onChange={(e) => setAuthor(e.target.value)} />
              </div>

              <div className='col-md-12'>
                <label className='form-label mt-2' htmlFor='isbn'>ISBN</label>
                <input type="text" id='isbn' className='form-control' placeholder='Enter ISBN Number' value={isbn} onChange={(e) => setIsbn(e.target.value)} />
              </div>

              <div className='col-md-12'>
                <label className='form-label mt-2' htmlFor='publicationDate'>Publication Date</label>
                <input type="date" id='publicationDate' className='form-control' value={publicationDate} onChange={(e) => setPublicationDate(e.target.value)} />
              </div>

              <div className='col-md-12'>
                <button type="submit" className='btn btn-primary mt-3 col-12' disabled={isLoading}>
                  {isLoading ? "Updating..." : "Update Book"}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateBook;