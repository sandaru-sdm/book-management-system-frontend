import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function SaveBook() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [isbn, setIsbn] = useState('');
    const [publicationDate, setPublicationDate] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const clearFields = () => {
        setTitle('');
        setAuthor('');
        setIsbn('');
        setPublicationDate('');
    };

    const validateForm = () => {
        if (!title.trim() || !author.trim() || !isbn.trim()) {
            toast.error("Please fill all required fields");
            return false;
        }
        return true;
    };

    const submitForm = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        const bookData = { title: title.trim(), author: author.trim(), isbn: isbn.trim(), publicationDate };

        try {
            const response = await axios.post(`http://localhost:8080/api/v1/books`, bookData);
            toast.success(response?.data?.message || "Book saved successfully");
            clearFields();
            navigate('/'); // Redirect to home page after successful save
        } catch (error) {
            handleError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleError = (error) => {
        if (error.response) {
            const { status, data } = error.response;
            const errorMessage = data?.message || getDefaultErrorMessage(status);
            toast.error(errorMessage);
        } else if (error.request) {
            toast.error("Network error. Please check your connection.");
        } else {
            toast.error("An unexpected error occurred.");
        }
    };

    const getDefaultErrorMessage = (status) => {
        const errorMessages = {
            400: "Invalid book data provided",
            404: "API endpoint not found",
            409: "Book with this ISBN already exists",
            500: "Internal server error"
        };
        return errorMessages[status] || `Unexpected error (${status})`;
    };

    return (
        <div className='container d-flex justify-content-center align-items-center min-vh-100'>
            <div className='card col-md-6'>
                <div className='card-body'>
                    <h2 className='text-center card-title mb-4'>Add New Book</h2>
                    <form onSubmit={submitForm} className='row g-3'>
                        <div className='col-md-12'>
                            <label className='form-label' htmlFor='title'>Title*</label>
                            <input
                                type="text"
                                id='title'
                                className='form-control'
                                placeholder='Enter Title'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className='col-md-12'>
                            <label className='form-label' htmlFor='author'>Author*</label>
                            <input
                                type="text"
                                id='author'
                                className='form-control'
                                placeholder='Enter Author'
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                required
                            />
                        </div>
                        <div className='col-md-12'>
                            <label className='form-label' htmlFor='isbn'>ISBN*</label>
                            <input
                                type="text"
                                id='isbn'
                                className='form-control'
                                placeholder='Enter ISBN'
                                value={isbn}
                                onChange={(e) => setIsbn(e.target.value)}
                                required
                            />
                        </div>
                        <div className='col-md-12'>
                            <label className='form-label' htmlFor='publicationDate'>Publication Date</label>
                            <input
                                type="date"
                                id='publicationDate'
                                className='form-control'
                                value={publicationDate}
                                onChange={(e) => setPublicationDate(e.target.value)}
                            />
                        </div>
                        <div className='col-md-12'>
                            <button 
                                type="submit" 
                                className='btn btn-primary w-100 mt-3'
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Saving...
                                    </>
                                ) : 'Save Book'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SaveBook;
