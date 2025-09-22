import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:8080/api/v1';

const getBookById = async (bookId) => {
    if (!bookId) return null;
    try {
        const response = await axios.get(`${API_BASE_URL}/books/${bookId}`);
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message || "Failed to fetch book details");
    }
};

function UpdateBook() {
    const { bookId } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        author: "",
        isbn: "",
        publicationDate: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                if (!bookId) {
                    throw new Error("Book ID is missing");
                }
                const data = await getBookById(bookId);
                if (!data) {
                    throw new Error("No data found");
                }
                setFormData({
                    title: data.title,
                    author: data.author,
                    isbn: data.isbn,
                    publicationDate: data.publicationDate || ""
                });
            } catch (error) {
                toast.error(error.message);
                navigate('/');
            } finally {
                setIsFetching(false);
            }
        };

        fetchBookDetails();
    }, [bookId, navigate]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const validateForm = () => {
        const { title, author, isbn } = formData;
        if (!title.trim() || !author.trim() || !isbn.trim()) {
            toast.error("Title, author and ISBN are required");
            return false;
        }
        return true;
    };

    const submitForm = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            const response = await axios.put(
                `${API_BASE_URL}/books/${bookId}`,
                formData
            );

            if (response.status === 200) {
                toast.success("Book updated successfully");
                navigate("/");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to update book");
        } finally {
            setIsLoading(false);
        }
    };

    if (isFetching) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className='container d-flex justify-content-center align-items-center vh-100'>
            <div className='card col-md-6 shadow'>
                <div className='card-body p-4'>
                    <h1 className='text-center card-title fw-bold mb-4'>Update Book</h1>
                    <form onSubmit={submitForm} className='row g-3'>
                        {['title', 'author', 'isbn'].map((field) => (
                            <div className='col-md-12' key={field}>
                                <label className='form-label' htmlFor={field}>
                                    {field.charAt(0).toUpperCase() + field.slice(1)} *
                                </label>
                                <input
                                    type="text"
                                    id={field}
                                    className='form-control'
                                    placeholder={`Enter ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        ))}

                        <div className='col-md-12'>
                            <label className='form-label' htmlFor='publicationDate'>
                                Publication Date
                            </label>
                            <input
                                type="date"
                                id='publicationDate'
                                className='form-control'
                                value={formData.publicationDate}
                                onChange={handleChange}
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
                                        Updating...
                                    </>
                                ) : "Update Book"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateBook;