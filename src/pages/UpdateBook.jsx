import React from 'react';
import { useParams } from 'react-router-dom';
import FormInput from '../components/FormInput';
import { useUpdateBookForm } from '../hooks/useUpdateBookForm';
import LoadingSpinner from '../components/LoadingSpinner';

const FORM_FIELDS = [
    { id: 'title', label: 'Title', required: true },
    { id: 'author', label: 'Author', required: true },
    { id: 'isbn', label: 'ISBN', required: true },
    { id: 'publicationDate', label: 'Publication Date', type: 'date', required: false }
];

function UpdateBook() {
    const { bookId } = useParams();
    const { formData, isLoading, isFetching, handleChange, handleSubmit } = useUpdateBookForm(bookId);

    if (isFetching) {
        return <LoadingSpinner />;
    }

    return (
        <div className='container d-flex justify-content-center align-items-center vh-100'>
            <div className='card col-md-6 shadow'>
                <div className='card-body p-4'>
                    <h1 className='text-center card-title fw-bold mb-4'>Update Book</h1>
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
                                ) : "Update Book"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateBook;