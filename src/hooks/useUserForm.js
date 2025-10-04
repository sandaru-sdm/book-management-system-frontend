import { useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

export const useUserForm = (navigate) => {
    const initialState = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
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

    const validateForm = () => {
        const { name, email, password, confirmPassword } = formData;

        const validations = [
            { condition: !name.trim(), message: "Name is required" },
            { condition: !email.trim(), message: "Email is required" },
            { condition: !password, message: "Password is required" },
            { condition: password !== confirmPassword, message: "Passwords do not match" },
            { condition: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), message: "Invalid email format" },
            { condition: password.length < 6, message: "Password must be at least 6 characters" }
        ];

        const error = validations.find(v => v.condition);
        if (error) {
            toast.error(error.message);
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:8080/api/v1/user', {
                name: formData.name.trim(),
                email: formData.email.trim(),
                password: formData.password
            });

            toast.success(response?.data?.message || "User saved successfully");
            navigate("/users");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to save user");
        } finally {
            setIsLoading(false);
        }
    };

    return { formData, isLoading, handleChange, handleSubmit };
};