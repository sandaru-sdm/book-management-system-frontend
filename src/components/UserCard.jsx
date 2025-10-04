import React from 'react';

const UserCard = ({ user, onUpdate, onDelete }) => (
    <div className='col-12 col-md-6 col-lg-4'>
        <div className='card h-100 shadow-sm'>
            <div className='card-body d-flex flex-column'>
                <h5 className='card-title fw-bold mb-3'>{user.name}</h5>
                <p className='card-text mb-4'>
                    <i className="bi bi-envelope me-2"></i>
                    {user.email}
                </p>
                <div className='mt-auto'>
                    <button 
                        className="btn btn-outline-primary w-100 mb-2" 
                        onClick={() => onUpdate(user.id)}
                    >
                        <i className="bi bi-pencil me-2"></i>
                        Update
                    </button>
                    <button
                        type='button'
                        className="btn btn-outline-danger w-100"
                        data-bs-toggle='modal'
                        data-bs-target='#confirmation-modal'
                        onClick={() => onDelete(user.id)}
                    >
                        <i className="bi bi-trash me-2"></i>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    </div>
);

export default UserCard;