import React from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput';
import { useBookForm } from '../hooks/useBookForm';

function SaveBook() {
    const navigate = useNavigate();
    const { formData, isLoading, handleChange, handleSubmit } = useBookForm(navigate);

    return (
        <div className='container d-flex justify-content-center align-items-center min-vh-100'>
            <div className='card col-md-6 shadow-sm'>
                <div className='card-body p-4'>
                    <h2 className='text-center card-title mb-4'>Add New Book</h2>
                    <form onSubmit={handleSubmit} className='row g-3'>
                        <FormInput
                            id="title"
                            label="Title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            placeholder="Enter Title"
                        />
                        <FormInput
                            id="author"
                            label="Author"
                            value={formData.author}
                            onChange={handleChange}
                            required
                            placeholder="Enter Author"
                        />
                        <FormInput
                            id="isbn"
                            label="ISBN"
                            value={formData.isbn}
                            onChange={handleChange}
                            required
                            placeholder="Enter ISBN"
                        />
                        <FormInput
                            id="publicationDate"
                            label="Publication Date"
                            type="date"
                            value={formData.publicationDate}
                            onChange={handleChange}
                        />
                        <div className='col-md-12'>
                            <button 
                                type="submit" 
                                className='btn btn-primary w-100 mt-3'
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Saving...
                                    </>
                                ) : 'Save Book'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SaveBook;
