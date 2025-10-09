import React from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput';
import { useUserForm } from '../hooks/useUserForm';

function SaveUser() {
    const navigate = useNavigate();
    const { formData, isLoading, handleChange, handleSubmit } = useUserForm(navigate);

    return (
        <div className='container vh-100 d-flex justify-content-center align-items-center'>
            <div className='card col-md-6 shadow'>
                <div className='card-body p-4'>
                    <h1 className='card-title text-center mb-4'>Create New User</h1>

                    <form className='row g-3' onSubmit={handleSubmit}>
                        <FormInput
                            id="name"
                            label="Name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            required
                        />

                        <FormInput
                            id="email"
                            label="Email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />

                        <FormInput
                            id="password"
                            label="Password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                            required
                        />

                        <FormInput
                            id="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            required
                        />

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