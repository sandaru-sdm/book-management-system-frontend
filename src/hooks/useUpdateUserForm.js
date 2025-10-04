import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { userService } from '../services/userService';

export const useUpdateUserForm = (userId) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (!userId) {
                toast.error("User ID is missing");
                navigate('/');
                return;
            }

            try {
                const data = await userService.getUserById(userId);
                setFormData({
                    name: data.name,
                    email: data.email
                });
            } catch (error) {
                toast.error(error.message || "Failed to fetch user details");
                navigate('/');
            } finally {
                setIsFetching(false);
            }
        };

        fetchUserDetails();
    }, [userId, navigate]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const validateForm = () => {
        const { name, email } = formData;
        if (!name.trim() || !email.trim()) {
            toast.error("All fields are required");
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            toast.error("Invalid email format");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            await userService.updateUser(userId, formData);
            toast.success("User updated successfully");
            navigate('/');
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to update user");
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