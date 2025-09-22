import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function SaveUser() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const validateForm = () => {
        const { name, email, password, confirmPassword } = formData;

        if (!name.trim() || !email.trim() || !password || !confirmPassword) {
            toast.error("All fields are required");
            return false;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address");
            return false;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        setIsLoading(true);

        const userData = {
            name: formData.name.trim(),
            email: formData.email.trim(),
            password: formData.password
        };

        try {
            const response = await axios.post('http://localhost:8080/api/v1/user', userData);

            if (response.status === 201) {
                toast.success(response?.data?.message || "User saved successfully");
                navigate("/users");
            }
        } catch (error) {
            const message = error.response?.data?.message || "Failed to save user";
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='container vh-100 d-flex justify-content-center align-items-center'>
            <div className='card col-md-6 shadow'>
                <div className='card-body p-4'>
                    <h1 className='card-title text-center mb-4'>Create New User</h1>

                    <form className='row g-3' onSubmit={handleSubmit}>
                        <div className='col-md-12'>
                            <label htmlFor='name' className='form-label'>Name *</label>
                            <input
                                type='text'
                                className='form-control'
                                id='name'
                                placeholder='Enter your name'
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className='col-md-12'>
                            <label htmlFor='email' className='form-label'>Email *</label>
                            <input
                                type='email'
                                className='form-control'
                                id='email'
                                placeholder='Enter your email'
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className='col-md-12'>
                            <label htmlFor='password' className='form-label'>Password *</label>
                            <input
                                type='password'
                                className='form-control'
                                id='password'
                                placeholder='Enter password'
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className='col-md-12'>
                            <label htmlFor='confirmPassword' className='form-label'>Confirm Password *</label>
                            <input
                                type='password'
                                className='form-control'
                                id='confirmPassword'
                                placeholder='Confirm your password'
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className='col-md-12'>
                            <button 
                                type='submit' 
                                className='btn btn-primary w-100 mt-4' 
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Saving...
                                    </>
                                ) : 'Save User'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SaveUser;