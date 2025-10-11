import React from 'react';
import { useParams } from 'react-router-dom';
import FormInput from '../components/FormInput';
import { useUpdateUserForm } from '../hooks/useUpdateUserForm';
import LoadingSpinner from '../components/LoadingSpinner';

const FORM_FIELDS = [
    { id: 'name', label: 'Name', required: true },
    { id: 'email', label: 'Email', type: 'email', required: true }
];

function UpdateUser() {
    const { userId } = useParams();
    const { formData, isLoading, isFetching, handleChange, handleSubmit } = useUpdateUserForm(userId);

    if (isFetching) {
        return <LoadingSpinner />;
    }

    return (
        <div className='container d-flex justify-content-center align-items-center vh-100'>
            <div className='card col-md-6 shadow'>
                <div className='card-body p-4'>
                    <h1 className='text-center card-title fw-bold mb-4'>Update User</h1>
                    <form onSubmit={handleSubmit} className='row g-3'>
                        {FORM_FIELDS.map(({ id, label, type = 'text', required }) => (
                            <FormInput
                                key={id}
                                id={id}
                                label={label}
                                type={type}
                                value={formData[id]}
                                onChange={handleChange}
                                required={required}
                                placeholder={`Enter ${label}`}
                            />
                        ))}

                        <div className='col-md-12'>
                            <button
                                type="submit"
                                className='btn btn-primary w-100 mt-3'
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Updating...
                                    </>
                                ) : "Update User"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateUser;