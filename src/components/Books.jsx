import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { bookService } from '../services/bookService';

// Extract BookCard into a separate component for better readability
const BookCard = ({ book, onUpdate, onDelete }) => (
    <div className="col-md-4 mb-4">
        <div className="card h-100">
            <img
                src={`/images/${book.id}.jpg`}
                className="card-img-top mb-3"
                style={{ height: '300px', objectFit: 'cover' }}
                alt={book.title}
                onError={e => { e.target.src = '/images/default.jpg'; }}
            />
            <div className="card-body">
                <h5 className="card-title text-center fw-bold">{book.title}</h5>
                <p className="card-text">
                    <strong>Author:</strong> {book.author}<br />
                    <strong>ISBN:</strong> {book.isbn}<br />
                    <strong>Published Date:</strong> {book.publicationDate}
                </p>
                <button 
                    className="btn btn-primary w-100" 
                    onClick={() => onUpdate(book.id)}
                >
                    Update Book
                </button>
                <button
                    type='button'
                    className="btn btn-danger w-100 mt-2"
                    data-bs-toggle='modal'
                    data-bs-target='#confirmation-modal'
                    onClick={() => onDelete(book.id)}
                >
                    Delete Book
                </button>
            </div>
        </div>
    </div>
);

function Books() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteBookId, setDeleteBookId] = useState(null);
    const navigate = useNavigate();

    const fetchBooks = useCallback(async () => {
        try {
            const data = await bookService.getBooks();
            setBooks(data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch books');
            toast.error('Failed to fetch books');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    const handleUpdate = useCallback((bookId) => {
        navigate(`/update-book/${bookId}`);
    }, [navigate]);

    const handleDelete = async (bookId) => {
        if (!bookId) {
            toast.error("Book id is missing");
            return;
        }

        try {
            await bookService.deleteBook(bookId);
            toast.success("Book deleted successfully");
            setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to delete book");
        } finally {
            setDeleteBookId(null);
        }
    };

    if (loading) {
        return <div className="container mt-4 text-center">Loading...</div>;
    }

    if (error) {
        return <div className="container mt-4 text-center text-danger">{error}</div>;
    }

    return (
        <div className="container mt-4">
            <div className="row justify-content-center align-items-center">
                {books.length > 0 ? (
                    books.map(book => (
                        <BookCard
                            key={book.id}
                            book={book}
                            onUpdate={handleUpdate}
                            onDelete={setDeleteBookId}
                        />
                    ))
                ) : (
                    <div className="col-12 text-center">
                        <p>No books found.</p>
                    </div>
                )}
            </div>

            {/* Confirmation Modal */}
            <div className='modal fade' id='confirmation-modal' tabIndex={-1}>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h1 className='modal-title fs-5'>Confirmation</h1>
                            <button type='button' className='btn-close' data-bs-dismiss="modal" aria-label='Close'></button>
                        </div>
                        <div className='modal-body'>
                            Are you sure you want to delete this book?
                        </div>
                        <div className='modal-footer'>
                            <button type='button' className='btn btn-secondary' data-bs-dismiss="modal">Cancel</button>
                            <button
                                type='button'
                                className='btn btn-danger'
                                onClick={() => handleDelete(deleteBookId)}
                                data-bs-dismiss="modal"
                                disabled={!deleteBookId}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Books;