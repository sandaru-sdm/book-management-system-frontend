import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1';

export const userService = {
    async getUserById(userId) {
        if (!userId) throw new Error('User ID is required');
        const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
        return response.data;
    },

    async updateUser(userId, userData) {
        if (!userId) throw new Error('User ID is required');
        const response = await axios.put(`${API_BASE_URL}/users/${userId}`, userData);
        return response.data;
    }
};