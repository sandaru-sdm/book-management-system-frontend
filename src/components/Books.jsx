import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const getBooks = async () => {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/books`);
        const data = response.data; 
        console.log(data);
        return data;
    } catch (error) {
        console.error('Failed to fetch books:', error);
        toast.error('Failed to fetch books');
    }
};

function Books() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const data = await getBooks();
                setBooks(data);
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleUpdate = (bookId) => {
        navigate(`/update-book/${bookId}`);
    };

    return (
        <div className="container mt-4">
            <div className="row justify-content-center align-items-center">
                {books.length > 0 ? (
                    books.map(book => (
                        <div className="col-md-4 mb-4" key={book.id}>
                            <div className="card h-100">
                                <img
                                    src={`/images/${book.id}.jpg`}
                                    className="card-img-top mb-3"
                                    style={{ height: '300px', objectFit: 'cover' }}
                                    alt={book.title}
                                />
                                <div className="card-body">
                                    <h5 className="card-title text-center fw-bold">{book.title}</h5>
                                    <p className="card-text">
                                        <strong>Author:</strong> {book.author}<br />
                                        <strong>ISBN:</strong> {book.isbn}<br />
                                        <strong>Published Date:</strong> {book.publicationDate}
                                    </p>
                                
                                    <button className="btn btn-primary w-100" onClick={() => handleUpdate(book.id)}>
                                        Update Book
                                    </button>
                                    <button className="btn btn-danger w-100 mt-2">Delete Book</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12">
                        <p>No books found.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Books;