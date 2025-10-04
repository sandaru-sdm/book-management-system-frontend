import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1';

export const bookService = {
    async getBooks() {
        const response = await axios.get(`${API_BASE_URL}/books`);
        return response.data;
    },

    async deleteBook(bookId) {
        const response = await axios.delete(`${API_BASE_URL}/books/${bookId}`);
        return response.data;
    },

    async getBookById(bookId) {
        if (!bookId) throw new Error('Book ID is required');
        const response = await axios.get(`${API_BASE_URL}/books/${bookId}`);
        return response.data;
    },

    async updateBook(bookId, bookData) {
        if (!bookId) throw new Error('Book ID is required');
        const response = await axios.put(`${API_BASE_URL}/books/${bookId}`, bookData);
        return response.data;
    }
};