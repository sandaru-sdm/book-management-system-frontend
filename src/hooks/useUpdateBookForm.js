import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { bookService } from '../services/bookService';

export const useUpdateBookForm = (bookId) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        isbn: '',
        publicationDate: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const data = await bookService.getBookById(bookId);
                setFormData({
                    title: data.title,
                    author: data.author,
                    isbn: data.isbn,
                    publicationDate: data.publicationDate || ''
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
        const validations = [
            { field: 'title', value: title },
            { field: 'author', value: author },
            { field: 'isbn', value: isbn }
        ];

        const emptyField = validations.find(v => !v.value.trim());
        if (emptyField) {
            toast.error(`${emptyField.field.charAt(0).toUpperCase() + emptyField.field.slice(1)} is required`);
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            await bookService.updateBook(bookId, formData);
            toast.success('Book updated successfully');
            navigate('/');
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to update book');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        formData,
        isLoading,
        isFetching,
        handleChange,
        handleSubmit
    };
};