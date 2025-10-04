import { useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

export const useBookForm = (navigate) => {
    const initialState = {
        title: '',
        author: '',
        isbn: '',
        publicationDate: ''
    };

    const [formData, setFormData] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const clearFields = () => setFormData(initialState);

    const validateForm = () => {
        const { title, author, isbn } = formData;
        if (!title.trim() || !author.trim() || !isbn.trim()) {
            toast.error("Please fill all required fields");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            const response = await axios.post(
                'http://localhost:8080/api/v1/books',
                { ...formData, title: formData.title.trim(), author: formData.author.trim(), isbn: formData.isbn.trim() }
            );
            toast.success(response?.data?.message || "Book saved successfully");
            clearFields();
            navigate('/');
        } catch (error) {
            handleError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        formData,
        isLoading,
        handleChange,
        handleSubmit
    };
};