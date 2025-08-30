import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-hot-toast';

function SaveBook() {

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [isbn, setIsbn] = useState("");
    const [publicationDate, setPublicationDate] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const submitForm = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        console.log(title, author, isbn, publicationDate);

        if (title === "" || author === "" || isbn === "") {
            console.log("Fill all the text fields");
            toast.error("Fill all the text fields");
            setIsLoading(false);
            return;
        }

        const bookData = { title, author, isbn, publicationDate };
        console.log(bookData);

        try {
            const response = await axios.post(`http://localhost:8080/api/v1/books`, bookData);

            // Success (201 Created)
            console.log("Book saved successfully");
            toast.success(response?.data?.message || "Book saved successfully");

            clearFields();

        } catch (error) {
            // Axios provides error.response if server responded
            if (error.response) {
                const { status, data } = error.response;
                console.error("Server responded with error:", status, data);

                switch (status) {
                    case 400:
                        toast.error(data?.message || "Bad Request");
                        break;
                    case 404:
                        toast.error(data?.message || "API endpoint not found");
                        break;
                    case 409:
                        toast.error(data?.message || "Book with the same ISBN already exists");
                        break;
                    case 500:
                        toast.error(data?.message || "Internal Server Error");
                        break;
                    default:
                        toast.error(data?.message || `Unexpected Error (${status})`);
                        break;
                }
            } else if (error.request) {
                // Request was sent but no response (network issue, CORS, server down)
                console.error("No response received:", error.request);
                toast.error("No response from server. Please check your connection.");
            } else {
                // Something else went wrong while setting up the request
                console.error("Error setting up request:", error.message);
                toast.error(error.message || "Error saving book");
            }
        } finally {
            setIsLoading(false);
            clearFields();
        }
    };


    const clearFields = () => {
        setTitle("");
        setAuthor("");
        setIsbn("");
        setPublicationDate("");
    }

    return (
        <div className='container d-flex justify-content-center align-items-center vh-100'>
            <div className='card col-md-6'>
                <div className='card-body m-3'>
                    <h2 className='card-title text-center fw-bold'>Add New Book</h2>
                    <form onSubmit={submitForm} className='row g-3'>

                        <div className='col-md-12'>
                            <label htmlFor="title" className='form-label'>Title</label>
                            <input type='text' className='form-control' placeholder='Title' id="title" value={title} onChange={e => setTitle(e.target.value)} />
                        </div>

                        <div className='col-md-12'>
                            <label htmlFor="author" className='form-label'>Author</label>
                            <input type="text" className='form-control' id="author" placeholder='Author' value={author} onChange={e => setAuthor(e.target.value)} />
                        </div>

                        <div className="col-md-12">
                            <label htmlFor="isbn" className='form-label'>ISBN</label>
                            <input type="text" className='form-control' id="isbn" placeholder='ISBN' value={isbn} onChange={e => setIsbn(e.target.value)} />

                        </div>

                        <div className="col-md-12">
                            <label htmlFor="publicationDate" className='form-label'>Publication Date</label>
                            <input type="date" className='form-control' id="publicationDate" value={publicationDate} onChange={(e) => setPublicationDate(e.target.value)} />
                        </div>

                        <div className='card-footer col-md-12 mt-5'>
                            <button
                                type="submit"
                                className="btn btn-primary col-12 d-flex justify-content-center align-items-center"
                                disabled={isLoading}
                            >
                                {isLoading ? "Saving..." : "Save Book"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </div>


    )
}

export default SaveBook;
